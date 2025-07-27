'use client'

import React, { useEffect, useState } from 'react'
import { useAccount, useWalletClient, WagmiProvider } from 'wagmi'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ethers } from 'ethers'
import AppKitProvider from './AppKitProvider'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { BigNumber } from "ethers";
import SmartContractInteraction from './SmartContractInteraction'
import { wagmiConfig } from './wagmi'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export const queryClient = new QueryClient()

const CONTRACT_ADDRESS = '0xE99938fc114b20f818C9202955ba8C8c4a5a79B9'
const USDT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7' // 主网USDT地址
const WBTC_ADDRESS = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599' // 主网WBTC地址

const CONTRACT_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "trustId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "settlor", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "beneficiary", "type": "address"}
    ],
    "name": "TrustCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "uint256", "name": "trustId", "type": "uint256"}],
    "name": "TrustDeposited",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "uint256", "name": "trustId", "type": "uint256"}],
    "name": "TrustRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "uint256", "name": "trustId", "type": "uint256"}],
    "name": "TrustWithdrawn",
    "type": "event"
  },
  {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}, {"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "beneficiaryTrustsMap",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "tokenAddress", "type": "address"},
      {"internalType": "uint256", "name": "depositAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "depositCount", "type": "uint256"},
      {"internalType": "uint256", "name": "withdrawCount", "type": "uint256"},
      {"internalType": "address", "name": "beneficiary", "type": "address"},
      {"internalType": "uint256", "name": "releaseTime", "type": "uint256"},
      {"internalType": "bool", "name": "isRevocable", "type": "bool"}
    ],
    "name": "create",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "trustId", "type": "uint256"}],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "trustId", "type": "uint256"}],
    "name": "revoke",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}, {"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "settlorTrustsMap",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "trustCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "trustSettingMap",
    "outputs": [
      {"internalType": "address", "name": "settlor", "type": "address"},
      {"internalType": "address", "name": "tokenAddress", "type": "address"},
      {"internalType": "uint256", "name": "depositAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "depositCount", "type": "uint256"},
      {"internalType": "uint256", "name": "releaseTime", "type": "uint256"},
      {"internalType": "uint256", "name": "withdrawCount", "type": "uint256"},
      {"internalType": "address", "name": "beneficiary", "type": "address"},
      {"internalType": "bool", "name": "isRevocable", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "trustStatusMap",
    "outputs": [
      {"internalType": "uint256", "name": "balance", "type": "uint256"},
      {"internalType": "uint256", "name": "depositedCount", "type": "uint256"},
      {"internalType": "uint256", "name": "withdrawedCount", "type": "uint256"},
      {"internalType": "uint256", "name": "nextWithdrawTime", "type": "uint256"},
      {"internalType": "bool", "name": "isRevoked", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "trustId", "type": "uint256"}],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const ERC20_ABI = [
  {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "balance", "type": "uint256"}],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {"name": "_to", "type": "address"},
      {"name": "_value", "type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"name": "success", "type": "bool"}],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {"name": "_spender", "type": "address"},
      {"name": "_value", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"name": "success", "type": "bool"}],
    "type": "function"
  }
]

interface TrustSetting {
  settlor: string
  tokenAddress: string
  depositAmount: string
  depositCount: string
  releaseTime: string
  withdrawCount: string
  beneficiary: string
  isRevocable: boolean
}

interface TrustStatus {
  balance: string
  depositedCount: string
  withdrawedCount: string
  nextWithdrawTime: string
  isRevoked: boolean
}

interface TrustData {
  label: string
  value: string
}

const formatDate = (timestamp: string) => {
  const date = new Date(Number(timestamp) * 1000)
  return date.toLocaleString('zh-CN')
}

const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

const Frame: React.FC<{ 
  trustData: TrustData[], 
  trustId: string,
  contract: ethers.Contract | null,
  address: string | undefined,
  setting: TrustSetting,
  status: TrustStatus,
  refetch: () => void
}> = ({ trustData, trustId, contract, address, setting, status, refetch }) => {
  const [depositAmount, setDepositAmount] = useState('')
  const [isDepositing, setIsDepositing] = useState(false)
  const [depositMessage, setDepositMessage] = useState('')
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const [withdrawMessage, setWithdrawMessage] = useState('')
  const { data: walletClient } = useWalletClient()

  const handleDeposit = async () => {
    if (!contract || !address || !walletClient) {
      setDepositMessage('⚠️ 请先连接钱包')
      return
    }

    if (!depositAmount || Number(depositAmount) <= 0) {
      setDepositMessage('⚠️ 请输入有效的注资金额')
      return
    }

    try {
      setIsDepositing(true)
      setDepositMessage('处理中...')
      
      const provider = new ethers.providers.Web3Provider(walletClient.transport, walletClient.chain.id)
      const signer = provider.getSigner()

      if (setting.tokenAddress === USDT_ADDRESS || setting.tokenAddress === WBTC_ADDRESS) {
        const tokenContract = new ethers.Contract(setting.tokenAddress, ERC20_ABI, signer)
        const decimals = setting.tokenAddress === USDT_ADDRESS ? 6 : 8
        const amount = ethers.utils.parseUnits(depositAmount, decimals)
        
        // 批准合约使用代币
        const approveTx = await tokenContract.approve(CONTRACT_ADDRESS, amount)
        await approveTx.wait()
        
        // 调用存款函数
        const tx = await contract.deposit(trustId)
        await tx.wait()
      } else {
        // ETH存款
        const amountWei = ethers.utils.parseEther(depositAmount)
        const tx = await contract.deposit(trustId, { value: amountWei })
        await tx.wait()
      }
      
      setDepositMessage('✅ 注资成功')
      refetch()
      setDepositAmount('')
    } catch (error: any) {
      console.error('注资失败:', error)
      setDepositMessage(`⚠️ 注资失败: ${error.message || '未知错误'}`)
    } finally {
      setIsDepositing(false)
    }
  }

  const handleWithdraw = async () => {
    if (!contract || !address || !walletClient) {
      setWithdrawMessage('⚠️ 请先连接钱包')
      return
    }

    if (status.isRevoked) {
      setWithdrawMessage('⚠️ 信托已被撤销')
      return
    }

    const currentTime = Math.floor(Date.now() / 1000)
    if (Number(setting.releaseTime) > currentTime) {
      setWithdrawMessage('⚠️ 未到释放时间')
      return
    }

    if (Number(status.withdrawedCount) >= Number(setting.withdrawCount)) {
      setWithdrawMessage('⚠️ 已达到最大提取次数')
      return
    }

    try {
      setIsWithdrawing(true)
      setWithdrawMessage('处理中...')
      
      const tx = await contract.withdraw(trustId)
      await tx.wait()
      
      setWithdrawMessage('✅ 提取成功')
      refetch()
    } catch (error: any) {
      console.error('提取失败:', error)
      setWithdrawMessage(`⚠️ 提取失败: ${error.message || '未知错误'}`)
    } finally {
      setIsWithdrawing(false)
    }
  }

  return (
    <Dialog>
      <Card className="inline-flex items-center p-7 relative h-[336px] bg-gradient-to-br from-[#0a0f2acc] to-[#000814aa] backdrop-blur-lg rounded-[20px] p-7 inline-flex items-center border border-white/30 shadow-xl shadow-black/30 rounded-[20px] border-[none] before:content-[''] ">
        <CardContent className="flex flex-col w-[273px] h-[237px] items-start justify-center gap-12 p-0">
          <div className="flex flex-col items-start justify-center gap-5 relative self-stretch w-full flex-[0_0_auto]">
            <h2 className="relative w-fit mt-[-1.00px] font-medium text-white text-2xl">
             #{trustId} 信托单 
            </h2>
            <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col w-[171px] h-[113px] items-start gap-5 relative">
                {trustData.map((item, index) => (
                  <div
                    key={`label-${index}`}
                    className="text-white text-lg"
                  >
                    {item.label}
                  </div>
                ))}
              </div>
              <div className="inline-flex flex-col h-[117px] items-start gap-5 relative flex-[0_0_auto]">
                {trustData.map((item, index) => (
                  <div
                    key={`value-${index}`}
                    className="text-white text-lg text-right"
                  >
                    {item.value}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogTrigger asChild>
            <Button className="self-stretch w-full h-[46px] !bg-white rounded-[100px] border-[none] text-black hover:bg-[#d8dbe0] justify-center mt-[-2px]">
              <span className="font-medium text-black text-lg">
                查看详细
              </span>
            </Button>
          </DialogTrigger>
        </CardContent>
      </Card>

      <DialogContent className="bg-[#080c19] text-white rounded-[20px] p-6 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4">#{trustId}信托详情</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#1a1f2e] p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 border-b border-white/20 pb-2">信托设置</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">委托人:</span>
                  <span className="font-mono">{formatAddress(setting.settlor)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">受益人:</span>
                  <span className="font-mono">{formatAddress(setting.beneficiary)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">资产类型:</span>
                  <span className="font-mono">
                    {setting.tokenAddress === '0x0000000000000000000000000000000000000000' ? 'ETH' : 
                     setting.tokenAddress === USDT_ADDRESS ? 'USDT' : 
                     setting.tokenAddress === WBTC_ADDRESS ? 'WBTC' : '代币'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">总注资量:</span>
                  <span className="font-mono">
                    {setting.tokenAddress === USDT_ADDRESS ? 
                      ethers.utils.formatUnits(setting.depositAmount, 6) + ' USDT' :
                     setting.tokenAddress === WBTC_ADDRESS ?
                      ethers.utils.formatUnits(setting.depositAmount, 8) + ' WBTC' :
                      ethers.utils.formatEther(setting.depositAmount) + ' ETH'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">计划注资次数:</span>
                  <span className="font-mono">{setting.depositCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">可提取次数:</span>
                  <span className="font-mono">{setting.withdrawCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">释放时间:</span>
                  <span className="font-mono">{formatDate(setting.releaseTime)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">是否可撤销:</span>
                  <span className="font-mono">{setting.isRevocable ? '是' : '否'}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1f2e] p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 border-b border-white/20 pb-2">信托状态</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">当前余额:</span>
                  <span className="font-mono">
                    {setting.tokenAddress === USDT_ADDRESS ?
                      ethers.utils.formatUnits(status.balance, 6) + ' USDT' :
                     setting.tokenAddress === WBTC_ADDRESS ?
                      ethers.utils.formatUnits(status.balance, 8) + ' WBTC' :
                      ethers.utils.formatEther(status.balance) + ' ETH'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">已注资次数:</span>
                  <span className="font-mono">{status.depositedCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">已提取次数:</span>
                  <span className="font-mono">{status.withdrawedCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">下次可提取时间:</span>
                  <span className="font-mono">
                    {status.nextWithdrawTime !== "0" ? formatDate(status.nextWithdrawTime) : "未设置"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">是否已撤销:</span>
                  <span className="font-mono">{status.isRevoked ? '是' : '否'}</span>
                </div>
              </div>
            </div>
          </div>

          {address?.toLowerCase() === setting.settlor.toLowerCase() && (
            <div className="bg-[#1a1f2e] p-4 rounded-lg mt-4">
              <h3 className="text-xl font-semibold mb-3 border-b border-white/20 pb-2">注资操作</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <Label htmlFor="depositAmount" className="text-gray-300">
                    注资金额 ({setting.tokenAddress === USDT_ADDRESS ? 'USDT' : 
                              setting.tokenAddress === WBTC_ADDRESS ? 'WBTC' : 'ETH'})
                  </Label>
                  <Input
                    id="depositAmount"
                    type="number"
                    min="0"
                    step={setting.tokenAddress === USDT_ADDRESS ? "0.01" : 
                          setting.tokenAddress === WBTC_ADDRESS ? "0.0001" : "0.001"}
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="bg-[#0a0f2a] text-white border-none"
                    placeholder="输入注资金额"
                  />
                  <Button 
                    onClick={handleDeposit}
                    disabled={isDepositing}
                    className="w-full !bg-white text-black hover:bg-[#d8dbe0] rounded-[100px]"
                  >
                    {isDepositing ? "处理中..." : "确认注资"}
                  </Button>
                </div>
                {depositMessage && (
                  <div className={`text-center mt-2 ${
                    depositMessage.includes('✅') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {depositMessage}
                  </div>
                )}
                <div className="text-sm text-gray-400 mt-2">
                  <p>注意：只有委托人可以向信托注资</p>
                  <p>当前余额: {setting.tokenAddress === USDT_ADDRESS ?
                    ethers.utils.formatUnits(status.balance, 6) + ' USDT' :
                    setting.tokenAddress === WBTC_ADDRESS ?
                    ethers.utils.formatUnits(status.balance, 8) + ' WBTC' :
                    ethers.utils.formatEther(status.balance) + ' ETH'}</p>
                </div>
              </div>
            </div>
          )}

          {address?.toLowerCase() === setting.beneficiary.toLowerCase() && (
            <div className="bg-[#1a1f2e] p-4 rounded-lg mt-4">
              <h3 className="text-xl font-semibold mb-3 border-b border-white/20 pb-2">提取操作</h3>
              <div className="space-y-3">
                <Button 
                  onClick={handleWithdraw}
                  disabled={isWithdrawing}
                  className="w-full !bg-white text-black hover:bg-[#d8dbe0] rounded-[100px]"
                >
                  {isWithdrawing ? "处理中..." : "提取资产"}
                </Button>
                {withdrawMessage && (
                  <div className={`text-center mt-2 ${
                    withdrawMessage.includes('✅') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {withdrawMessage}
                  </div>
                )}
                <div className="text-sm text-gray-400 mt-2">
                  <p>注意：只有受益人可以提取资产</p>
                  <p>释放时间: {formatDate(setting.releaseTime)}</p>
                  <p>剩余提取次数: {Number(setting.withdrawCount) - Number(status.withdrawedCount)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

const CreateTrustForm: React.FC<{ contract: ethers.Contract | null, setOutput: (output: string) => void }> = ({ contract, setOutput }) => {
  const { data: walletClient } = useWalletClient()
  const [formData, setFormData] = useState({
    tokenAddress: '0x0000000000000000000000000000000000000000',
    tokenType: 'eth',
    depositAmount: '',
    depositCount: '',
    withdrawCount: '',
    beneficiary: '',
    releaseTime: '',
    isRevocable: true,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData({ ...formData, isRevocable: checked })
  }

  const handleSubmit = async () => {
    if (!contract || !walletClient) {
      setOutput('⚠️ 合约未初始化或钱包未连接')
      return
    }
    try {
      const decimals = formData.tokenType === 'usdt' ? 6 : formData.tokenType === 'wbtc' ? 8 : 18
      const depositAmount = ethers.utils.parseUnits(formData.depositAmount || '0', decimals)
      
      const provider = new ethers.providers.Web3Provider(walletClient.transport, walletClient.chain.id)
      const signer = provider.getSigner()
      
      if (formData.tokenType === 'usdt' || formData.tokenType === 'wbtc') {
        const tokenContract = new ethers.Contract(formData.tokenAddress, ERC20_ABI, signer)
        const approveTx = await tokenContract.approve(CONTRACT_ADDRESS, depositAmount)
        await approveTx.wait()
      }

      const tx = await contract.create(
        formData.tokenAddress,
        depositAmount,
        parseInt(formData.depositCount) || 0,
        parseInt(formData.withdrawCount) || 0,
        formData.beneficiary,
        parseInt(formData.releaseTime) || 0,
        formData.isRevocable,
        { value: formData.tokenType === 'eth' ? depositAmount : 0 }
      )
      await tx.wait()
      setOutput('✅ 信托创建成功')
    } catch (error: any) {
      setOutput(`⚠️ 信托创建失败: ${error.message}`)
      console.error('信托创建错误:', error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="fixed bottom-8 left-1/2 transform -translate-x-1/2
    w-[200px] h-[50px]
    !bg-white/30 backdrop-blur-lg
    border border-white/30
    shadow-md shadow-black/10
    rounded-[100px]
    text-black/300 font-medium
    hover:bg-white/20 hover:ring-1 hover:ring-white/30
    transition-all duration-200
    z-10">
          <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-lg">创建信托</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#080c19] text-white rounded-[20px] p-6">
        <DialogHeader>
          <DialogTitle className="[font-family:'PingFang_SC-Medium',Helvetica] text-2xl">创建新信托</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tokenType" className="text-right">资产类型</Label>
            <Select
              onValueChange={(val: any) => {
                let tokenAddress = '0x0000000000000000000000000000000000000000'
                if (val === 'usdt') tokenAddress = USDT_ADDRESS
                if (val === 'wbtc') tokenAddress = WBTC_ADDRESS
                setFormData({ ...formData, tokenType: val, tokenAddress })
              }}
              defaultValue="eth"
            >
              <SelectTrigger className="col-span-3 bg-[#1a1f2e] text-white border-none">
                <SelectValue placeholder="选择资产类型" />
              </SelectTrigger>
              <SelectContent className="mt-4">
                <SelectItem value="eth">ETH</SelectItem>
                <SelectItem value="usdt">USDT</SelectItem>
                <SelectItem value="wbtc">WBTC</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="depositAmount" className="text-right">
              注资数量 ({formData.tokenType.toUpperCase()})
            </Label>
            <Input
              id="depositAmount"
              name="depositAmount"
              value={formData.depositAmount}
              onChange={handleInputChange}
              className="col-span-3 bg-[#1a1f2e] text-white border-none"
              placeholder="输入注资数量"
              type="number"
              step={formData.tokenType === 'usdt' ? "0.01" : 
                    formData.tokenType === 'wbtc' ? "0.0001" : "0.001"}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="depositCount" className="text-right">注资次数</Label>
            <Input
              id="depositCount"
              name="depositCount"
              value={formData.depositCount}
              onChange={handleInputChange}
              className="col-span-3 bg-[#1a1f2e] text-white border-none"
              placeholder="输入注资次数"
              type="number"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="withdrawCount" className="text-right">提取次数</Label>
            <Input
              id="withdrawCount"
              name="withdrawCount"
              value={formData.withdrawCount}
              onChange={handleInputChange}
              className="col-span-3 bg-[#1a1f2e] text-white border-none"
              placeholder="输入提取次数"
              type="number"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="beneficiary" className="text-right">受益人地址</Label>
            <Input
              id="beneficiary"
              name="beneficiary"
              value={formData.beneficiary}
              onChange={handleInputChange}
              className="col-span-3 bg-[#1a1f2e] text-white border-none"
              placeholder="输入受益人地址"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="releaseTime" className="text-right">释放时间 (Unix)</Label>
            <Input
              id="releaseTime"
              name="releaseTime"
              value={formData.releaseTime}
              onChange={handleInputChange}
              className="col-span-3 bg-[#1a1f2e] text-white border-none"
              placeholder="输入释放时间戳"
              type="number"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isRevocable" className="text-right">可撤销</Label>
            <Switch
              id="isRevocable"
              checked={formData.isRevocable}
              onCheckedChange={handleSwitchChange}
              className={`col-span-3 transition-all duration-300 ${
                formData.isRevocable ? 'bg-green-600' : 'bg-gray-600'
              }`}
            />
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          className="w-full !bg-white text-black hover:bg-[#d8dbe0] rounded-[100px]"
        >
          <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-lg">提交</span>
        </Button>
      </DialogContent>
    </Dialog>
  )
}

const TrustInterface: React.FC = () => {
  const { address, isConnected, chain } = useAccount()
  const { data: walletClient, isLoading, isError } = useWalletClient()
  const [contract, setContract] = useState<ethers.Contract | null>(null)
  const [output, setOutput] = useState<string>('')
  const [trusts, setTrusts] = useState<{ 
    id: string, 
    data: TrustData[],
    setting: TrustSetting,
    status: TrustStatus
  }[]>([])
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const refetchTrusts = () => setRefreshTrigger(prev => prev + 1)

  useEffect(() => {
    const initializeContract = async () => {
      if (!isConnected) {
        setOutput('⚠️ 请先连接钱包')
        return
      }
      if (isLoading) {
        setOutput('⚠️ 正在加载钱包客户端...')
        return
      }
      if (isError) {
        setOutput('⚠️ 钱包客户端加载失败')
        return
      }
      if (!walletClient) {
        setOutput('⚠️ 签名人丢失')
        return
      }
      try {
        const provider = new ethers.providers.Web3Provider(walletClient.transport, walletClient.chain.id)
        const signer = provider.getSigner()
        const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
        setContract(contractInstance)
        setOutput('✅ 合约初始化成功')
      } catch (error: any) {
        setOutput(`⚠️ 合约初始化失败: ${error.message}`)
        console.error('合约初始化错误:', error)
      }
    }
    initializeContract()
  }, [walletClient, isConnected, isLoading, isError])

  useEffect(() => {
    const fetchTrustData = async () => {
      if (!contract || !address) return
      try {
        const count = await contract.trustCount()
        const trustCount = Number(count.toString())
        const trustDataArray = []
        for (let i = 0; i < trustCount; i++) {
          try {
            const settingRaw = await contract.trustSettingMap(i)
            const statusRaw = await contract.trustStatusMap(i)

            const setting: TrustSetting = {
              settlor: settingRaw.settlor,
              tokenAddress: settingRaw.tokenAddress,
              depositAmount: settingRaw.depositAmount.toString(),
              depositCount: settingRaw.depositCount.toString(),
              releaseTime: settingRaw.releaseTime.toString(),
              withdrawCount: settingRaw.withdrawCount.toString(),
              beneficiary: settingRaw.beneficiary,
              isRevocable: settingRaw.isRevocable,
            }

            const status: TrustStatus = {
              balance: statusRaw.balance.toString(),
              depositedCount: statusRaw.depositedCount.toString(),
              withdrawedCount: statusRaw.withdrawedCount.toString(),
              nextWithdrawTime: statusRaw.nextWithdrawTime.toString(),
              isRevoked: statusRaw.isRevoked,
            }

            if (
              setting.settlor.toLowerCase() !== address.toLowerCase() &&
              setting.beneficiary.toLowerCase() !== address.toLowerCase()
            ) {
              continue
            }

            const tokenSymbolMap: Record<string, string> = {
              '0x0000000000000000000000000000000000000000': 'ETH',
              [USDT_ADDRESS]: 'USDT',
              [WBTC_ADDRESS]: 'WBTC'
            }

            const formatAmount = (amount: string) => {
              if (setting.tokenAddress === USDT_ADDRESS) {
                return ethers.utils.formatUnits(amount, 6) + ' USDT'
              } else if (setting.tokenAddress === WBTC_ADDRESS) {
                return ethers.utils.formatUnits(amount, 8) + ' WBTC'
              }
              return ethers.utils.formatEther(amount) + ' ETH'
            }

            const trustData: TrustData[] = [
              { label: "委托人：", value: formatAddress(setting.settlor) },
              { label: "资产类别：", value: tokenSymbolMap[setting.tokenAddress] || '代币' },
              { label: "注资数量：", value: formatAmount(setting.depositAmount) }
            ]
            
            trustDataArray.push({ 
              id: i.toString(), 
              data: trustData,
              setting,
              status
            })
          } catch (err) {
            console.warn(`跳过信托 ID ${i}，读取失败`, err)
          }
        }
        setTrusts(trustDataArray)
        setOutput(trustDataArray.length > 0 ? '✅ 信托数据加载成功' : 'ℹ️ 无信托数据')
      } catch (err: any) {
        setOutput(`⚠️ 加载信托数据失败: ${err.message}`)
        console.error('加载信托数据错误:', err)
      }
    }
    fetchTrustData()
  }, [contract, address, refreshTrigger])

  if (isLoading && !isConnected) return <div className="text-center text-gray-600">加载钱包客户端...</div>
  if (isError) return <div className="text-center text-red-600">钱包连接出错</div>
  if (!isConnected) return <div className="text-center text-gray-600">请先连接钱包</div>
  if (!contract) return <div className="text-center text-gray-600">初始化合约中...</div>

  return (
    <div className="max-w-4xl mx-auto p-6 bg-black shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">我的信托</h2>
      {output && <div className="text-center text-white mb-4">{output}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {trusts.map((trust) => (
          <Frame 
            key={trust.id} 
            trustData={trust.data} 
            trustId={trust.id}
            contract={contract}
            address={address}
            setting={trust.setting}
            status={trust.status}
            refetch={refetchTrusts}
          />
        ))}
      </div>
      <CreateTrustForm contract={contract} setOutput={setOutput} />
    </div>
  )
}

const MyTrustPage: React.FC = () => {
  return (
    <SmartContractInteraction>
      <AppKitProvider>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <TrustInterface />
          </QueryClientProvider>
        </WagmiProvider>
      </AppKitProvider>
    </SmartContractInteraction>
  )
}

export default MyTrustPage