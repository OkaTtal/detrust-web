// 'use client'

// import React, { useEffect, useState } from 'react'
// import { useAccount, useWalletClient, WagmiProvider } from 'wagmi'
// import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
// import { ethers } from 'ethers'
// import AppKitProvider from './AppKitProvider'
// import SmartContractInteraction from './SmartContractInteraction'
// import { wagmiConfig } from './wagmi'
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"

// export const queryClient = new QueryClient()

// const CONTRACT_ADDRESS = '0xE99938fc114b20f818C9202955ba8C8c4a5a79B9'

// const CONTRACT_ABI = [
//   {
//     "anonymous": false,
//     "inputs": [
//       {"indexed": true, "internalType": "uint256", "name": "trustId", "type": "uint256"},
//       {"indexed": true, "internalType": "address", "name": "settlor", "type": "address"},
//       {"indexed": true, "internalType": "address", "name": "beneficiary", "type": "address"}
//     ],
//     "name": "TrustCreated",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [{"indexed": true, "internalType": "uint256", "name": "trustId", "type": "uint256"}],
//     "name": "TrustDeposited",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [{"indexed": true, "internalType": "uint256", "name": "trustId", "type": "uint256"}],
//     "name": "TrustRevoked",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [{"indexed": true, "internalType": "uint256", "name": "trustId", "type": "uint256"}],
//     "name": "TrustWithdrawn",
//     "type": "event"
//   },
//   {
//     "inputs": [{"internalType": "address", "name": "", "type": "address"}, {"internalType": "uint256", "name": "", "type": "uint256"}],
//     "name": "beneficiaryTrustsMap",
//     "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {"internalType": "address", "name": "tokenAddress", "type": "address"},
//       {"internalType": "uint256", "name": "depositAmount", "type": "uint256"},
//       {"internalType": "uint256", "name": "depositCount", "type": "uint256"},
//       {"internalType": "uint256", "name": "withdrawCount", "type": "uint256"},
//       {"internalType": "address", "name": "beneficiary", "type": "address"},
//       {"internalType": "uint256", "name": "releaseTime", "type": "uint256"},
//       {"internalType": "bool", "name": "isRevocable", "type": "bool"}
//     ],
//     "name": "create",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [{"internalType": "uint256", "name": "trustId", "type": "uint256"}],
//     "name": "deposit",
//     "outputs": [],
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "inputs": [{"internalType": "uint256", "name": "trustId", "type": "uint256"}],
//     "name": "revoke",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [{"internalType": "address", "name": "", "type": "address"}, {"internalType": "uint256", "name": "", "type": "uint256"}],
//     "name": "settlorTrustsMap",
//     "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "trustCount",
//     "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
//     "name": "trustSettingMap",
//     "outputs": [
//       {"internalType": "address", "name": "settlor", "type": "address"},
//       {"internalType": "address", "name": "tokenAddress", "type": "address"},
//       {"internalType": "uint256", "name": "depositAmount", "type": "uint256"},
//       {"internalType": "uint256", "name": "depositCount", "type": "uint256"},
//       {"internalType": "uint256", "name": "releaseTime", "type": "uint256"},
//       {"internalType": "uint256", "name": "withdrawCount", "type": "uint256"},
//       {"internalType": "address", "name": "beneficiary", "type": "address"},
//       {"internalType": "bool", "name": "isRevocable", "type": "bool"}
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
//     "name": "trustStatusMap",
//     "outputs": [
//       {"internalType": "uint256", "name": "balance", "type": "uint256"},
//       {"internalType": "uint256", "name": "depositedCount", "type": "uint256"},
//       {"internalType": "uint256", "name": "withdrawedCount", "type": "uint256"},
//       {"internalType": "uint256", "name": "nextWithdrawTime", "type": "uint256"},
//       {"internalType": "bool", "name": "isRevoked", "type": "bool"}
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [{"internalType": "uint256", "name": "trustId", "type": "uint256"}],
//     "name": "withdraw",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ]

// interface TrustSetting {
//   settlor: string
//   tokenAddress: string
//   depositAmount: string
//   depositCount: string
//   releaseTime: string
//   withdrawCount: string
//   beneficiary: string
//   isRevocable: boolean
// }

// interface TrustStatus {
//   balance: string
//   depositedCount: string
//   withdrawedCount: string
//   nextWithdrawTime: string
//   isRevoked: boolean
// }

// interface TrustData {
//   label: string
//   value: string
// }

// const TrustDetailDialog: React.FC<{ contract: ethers.Contract | null, trustId: string, setOutput: (output: string) => void }> = ({ contract, trustId, setOutput }) => {
//   const [details, setDetails] = useState<TrustData[]>([])
//   const [isOpen, setIsOpen] = useState(false)

//   useEffect(() => {
//     const fetchTrustDetails = async () => {
//       if (!contract) return
//       try {
//         const setting: TrustSetting = await contract.trustSettingMap(trustId)
//         const status: TrustStatus = await contract.trustStatusMap(trustId)
//         const trustDetails: TrustData[] = [
//           { label: "委托人：", value: setting.settlor },
//           { label: "代币地址：", value: setting.tokenAddress === '0x0000000000000000000000000000000000000000' ? 'ETH' : setting.tokenAddress },
//           { label: "注资数量：", value: ethers.utils.formatEther(setting.depositAmount) + ' ETH' },
//           { label: "注资次数：", value: setting.depositCount },
//           { label: "提取次数：", value: setting.withdrawCount },
//           { label: "受益人：", value: setting.beneficiary },
//           { label: "释放时间：", value: new Date(Number(setting.releaseTime) * 1000).toLocaleString() },
//           { label: "可撤销：", value: setting.isRevocable ? '是' : '否' },
//           { label: "余额：", value: ethers.utils.formatEther(status.balance) + ' ETH' },
//           { label: "已注资次数：", value: status.depositedCount },
//           { label: "已提取次数：", value: status.withdrawedCount },
//           { label: "下次提取时间：", value: status.nextWithdrawTime ? new Date(Number(status.nextWithdrawTime) * 1000).toLocaleString() : '无' },
//           { label: "是否已撤销：", value: status.isRevoked ? '是' : '否' },
//         ]
//         setDetails(trustDetails)
//       } catch (error: any) {
//         setOutput(`⚠️ 加载信托详情失败: ${error.message}`)
//         console.error('加载信托详情错误:', error)
//       }
//     }
//     if (isOpen) fetchTrustDetails()
//   }, [contract, trustId, setOutput, isOpen])

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>
//         <Button className="relative self-stretch w-full h-[46px] !bg-white rounded-[100px] border-[none] text-black hover:bg-[#d8dbe0]">
//           <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-black text-lg tracking-[0] leading-[normal]">
//             查看详细
//           </span>
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="bg-[#080c19] text-white rounded-[20px] p-6 max-w-2xl">
//         <DialogHeader>
//           <DialogTitle className="[font-family:'PingFang_SC-Medium',Helvetica] text-2xl">信托单 #{trustId} 详情</DialogTitle>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           {details.map((item, index) => (
//             <div key={`detail-${index}`} className="grid grid-cols-4 items-center gap-4">
//               <Label className="text-right [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-white text-lg">
//                 {item.label}
//               </Label>
//               <span className="col-span-3 [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-white text-lg">
//                 {item.value}
//               </span>
//             </div>
//           ))}
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

// const Frame: React.FC<{ trustData: TrustData[], trustId: string, contract: ethers.Contract | null, setOutput: (output: string) => void }> = ({ trustData, trustId, contract, setOutput }) => {
//   return (
//     <Card className="bg-black inline-flex items-center p-7 relative bg-[#080c1999] rounded-[20px] border-[none] before:content-['']">
//       <CardContent className="flex flex-col w-[273px] h-[237px] items-start justify-center gap-5 p-0">
//         <div className="flex flex-col items-start justify-center gap-5 relative self-stretch w-full flex-[0_0_auto]">
//           <h2 className="relative w-fit mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-white text-2xl tracking-[0] leading-[normal]">
//             信托单 #{trustId}
//           </h2>
//           <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
//             <div className="flex flex-col w-[171px] h-[113px] items-start gap-5 relative">
//               {trustData.map((item, index) => (
//                 <div
//                   key={`label-${index}`}
//                   className={`relative self-stretch ${index === 0 ? "mt-[-5.00px]" : ""} ${index === trustData.length - 1 ? "mb-[-1.00px]" : ""} [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-white text-lg tracking-[0] leading-[normal]`}
//                 >
//                   {item.label}
//                 </div>
//               ))}
//             </div>
//             <div className="inline-flex flex-col h-[117px] items-start gap-5 relative flex-[0_0_auto]">
//               {trustData.map((item, index) => (
//                 <div
//                   key={`value-${index}`}
//                   className={`relative self-stretch ${index === 0 ? "mt-[-1.00px]" : ""} [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-white text-lg text-right tracking-[0] leading-[normal]`}
//                 >
//                   {item.value}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <TrustDetailDialog contract={contract} trustId={trustId} setOutput={setOutput} />
//       </CardContent>
//     </Card>
//   )
// }

// const CreateTrustForm: React.FC<{ contract: ethers.Contract | null, setOutput: (output: string) => void }> = ({ contract, setOutput }) => {
//   const [formData, setFormData] = useState({
//     tokenAddress: '0x0000000000000000000000000000000000000000', // 默认 ETH
//     depositAmount: '',
//     depositCount: '',
//     withdrawCount: '',
//     beneficiary: '',
//     releaseTime: '',
//     isRevocable: true,
//   })
//   const [isOpen, setIsOpen] = useState(false)

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSwitchChange = (checked: boolean) => {
//     setFormData({ ...formData, isRevocable: checked })
//   }

//   const handleSubmit = async () => {
//     if (!contract) {
//       setOutput('⚠️ 合约未初始化')
//       return
//     }
//     try {
//       const depositAmount = ethers.utils.parseEther(formData.depositAmount || '0')
//       const tx = await contract.create(
//         formData.tokenAddress,
//         depositAmount,
//         parseInt(formData.depositCount) || 0,
//         parseInt(formData.withdrawCount) || 0,
//         formData.beneficiary,
//         parseInt(formData.releaseTime) || 0,
//         formData.isRevocable
//       )
//       await tx.wait()
//       setOutput('✅ 信托创建成功')
//       setIsOpen(false) // 成功后关闭弹窗
//     } catch (error: any) {
//       setOutput(`⚠️ 信托创建失败: ${error.message}`)
//       console.error('信托创建错误:', error)
//     }
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>
//         <Button className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-[200px] h-[50px] bg-white rounded-[100px] border-[none] text-black hover:bg-[#d8dbe0] z-10">
//           <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-lg">创建信托</span>
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="bg-[#080c19] text-white rounded-[20px] p-6">
//         <DialogHeader>
//           <DialogTitle className="[font-family:'PingFang_SC-Medium',Helvetica] text-2xl">创建新信托</DialogTitle>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="tokenAddress" className="text-right">代币地址</Label>
//             <Input
//               id="tokenAddress"
//               name="tokenAddress"
//               value={formData.tokenAddress}
//               onChange={handleInputChange}
//               className="col-span-3 bg-[#1a1f2e] text-white border-none"
//               placeholder="输入代币地址（ETH 用 0x0...0）"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="depositAmount" className="text-right">注资数量 (ETH)</Label>
//             <Input
//               id="depositAmount"
//               name="depositAmount"
//               value={formData.depositAmount}
//               onChange={handleInputChange}
//               className="col-span-3 bg-[#1a1f2e] text-white border-none"
//               placeholder="输入注资数量"
//               type="number"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="depositCount" className="text-right">注资次数</Label>
//             <Input
//               id="depositCount"
//               name="depositCount"
//               value={formData.depositCount}
//               onChange={handleInputChange}
//               className="col-span-3 bg-[#1a1f2e] text-white border-none"
//               placeholder="输入注资次数"
//               type="number"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="withdrawCount" className="text-right">提取次数</Label>
//             <Input
//               id="withdrawCount"
//               name="withdrawCount"
//               value={formData.withdrawCount}
//               onChange={handleInputChange}
//               className="col-span-3 bg-[#1a1f2e] text-white border-none"
//               placeholder="输入提取次数"
//               type="number"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="beneficiary" className="text-right">受益人地址</Label>
//             <Input
//               id="beneficiary"
//               name="beneficiary"
//               value={formData.beneficiary}
//               onChange={handleInputChange}
//               className="col-span-3 bg-[#1a1f2e] text-white border-none"
//               placeholder="输入受益人地址"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="releaseTime" className="text-right">释放时间 (Unix)</Label>
//             <Input
//               id="releaseTime"
//               name="releaseTime"
//               value={formData.releaseTime}
//               onChange={handleInputChange}
//               className="col-span-3 bg-[#1a1f2e] text-white border-none"
//               placeholder="输入释放时间戳"
//               type="number"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="isRevocable" className="text-right">可撤销</Label>
//             <Switch
//               id="isRevocable"
//               checked={formData.isRevocable}
//               onCheckedChange={handleSwitchChange}
//               className="col-span-3"
//             />
//           </div>
//         </div>
//         <Button
//           onClick={handleSubmit}
//           className="w-full bg-white text-black hover:bg-[#d8dbe0] rounded-[100px]"
//         >
//           <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-lg">提交</span>
//         </Button>
//       </DialogContent>
//     </Dialog>
//   )
// }

// const TrustInterface: React.FC = () => {
//   const { address, isConnected, chain } = useAccount()
//   const { data: walletClient, isLoading, isError } = useWalletClient()
//   const [contract, setContract] = useState<ethers.Contract | null>(null)
//   const [output, setOutput] = useState<string>('')
//   const [trusts, setTrusts] = useState<{ id: string, data: TrustData[] }[]>([])

//   // 初始化合约
//   useEffect(() => {
//     const initializeContract = async () => {
//       console.log('useEffect 触发, walletClient:', walletClient, 'isConnected:', isConnected)
//       if (!isConnected) {
//         // setOutput('⚠️ 请先连接钱包')
//         return
//       }
//       if (isLoading) {
//         // setOutput('⚠️ 正在加载钱包客户端...')
//         return
//       }
//       if (isError) {
//         // setOutput('⚠️ 钱包客户端加载失败')
//         return
//       }
//       if (!walletClient) {
//         // setOutput('⚠️ 签名人丢失')
//         console.log('walletClient 未加载:', walletClient)
//         return
//       }
//       try {
//         const provider = new ethers.providers.Web3Provider(walletClient.transport, walletClient.chain.id)
//         const signer = provider.getSigner()
//         const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
//         setContract(contractInstance)
//         // setOutput('✅ 合约初始化成功')
//         console.log('合约初始化成功:', contractInstance)
//       } catch (error: any) {
//         // setOutput(`⚠️ 合约初始化失败: ${error.message}`)
//         console.error('合约初始化错误:', error)
//       }
//     }
//     initializeContract()
//   }, [walletClient, isConnected, isLoading, isError])

//   // 自动获取信托数据
//   useEffect(() => {
//     const fetchTrustData = async () => {
//       if (!contract) return
//       try {
//         const count = await contract.trustCount()
//         const trustCount = Number(count.toString())
//         const trustDataArray: { id: string, data: TrustData[] }[] = []
//         for (let i = 0; i < trustCount; i++) {
//           try {
//             const setting: TrustSetting = await contract.trustSettingMap(i)
//             // 只保留当前用户相关的信托
//             if (
//               setting.settlor.toLowerCase() !== address?.toLowerCase() &&
//               setting.beneficiary.toLowerCase() !== address?.toLowerCase()
//             ) {
//               continue;
//             }

//             const trustData: TrustData[] = [
//               { label: "委托人：", value: setting.settlor.slice(0, 6) + '...' + setting.settlor.slice(-4) },
//               { label: "资产类别：", value: setting.tokenAddress === '0x0000000000000000000000000000000000000000' ? 'ETH' : 'Token' },
//               { label: "注资数量：", value: ethers.utils.formatEther(setting.depositAmount) + ' ETH' }
//             ]
//             trustDataArray.push({ id: i.toString(), data: trustData })
//           } catch (err) {
//             console.warn(`跳过信托 ID ${i}，读取失败`, err)
//           }
//         }
//         setTrusts(trustDataArray)
//         // setOutput(trustDataArray.length > 0 ? '✅ 信托数据加载成功' : 'ℹ️ 无信托数据')
//       } catch (err: any) {
//         // setOutput(`⚠️ 加载信托数据失败: ${err.message}`)
//         console.error('加载信托数据错误:', err)
//       }
//     }
//     fetchTrustData()
//   }, [contract, address])

//   if (isLoading && !isConnected) return <div className="text-center text-gray-600">加载钱包客户端...</div>
//   if (isError) return <div className="text-center text-red-600">钱包连接出错</div>
//   if (!isConnected) return <div className="text-center text-gray-600">请先连接钱包</div>
//   if (!contract) return <div className="text-center text-gray-600">初始化合约中...</div>

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-black shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold text-center mb-6 text-black">setOutput</h2>
//       {output && <div className="text-center text-gray-600 mb-4">{output}</div>}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {trusts.map((trust) => (
//           <Frame key={trust.id} trustData={trust.data} trustId={trust.id} contract={contract} setOutput={setOutput} />
//         ))}
//       </div>
//       <CreateTrustForm contract={contract} setOutput={setOutput} />
//     </div>
//   )
// }

// const MyTrustPage: React.FC = () => {
//   return (
//     <SmartContractInteraction>
//       <AppKitProvider>
//         <WagmiProvider config={wagmiConfig}>
//           <QueryClientProvider client={queryClient}>
//             <TrustInterface />
//           </QueryClientProvider>
//         </WagmiProvider>
//       </AppKitProvider>
//     </SmartContractInteraction>
//   )
// }

// export default MyTrustPage