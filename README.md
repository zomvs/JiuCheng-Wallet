<p align="center">
  <img src="apps/mobile/src/assets/brand/cubex-app-icon.svg" width="128" height="128" alt="CubeX Wallet App Icon" />
</p>

<h1 align="center">CubeX Wallet</h1>

<p align="center">
  面向 iOS 与 Android 的自托管 Web3 钱包客户端
</p>

<p align="center">
  <strong>安全地管理账户、资产、DApp 连接与链上交易。</strong>
</p>

> [!IMPORTANT]
> CubeX Wallet 当前处于持续开发阶段。本仓库可以用于本地开发、功能验证和二次开发，但在正式发布到 App Store、Google Play 或向真实用户提供服务前，必须完成本文中的生产环境检查清单、安全审查和法务审核。

## 项目简介

CubeX Wallet 是一个基于 React Native 构建的跨平台自托管钱包项目，支持 iOS 与 Android。项目以移动端钱包体验为核心，提供账户管理、资产展示、DApp 连接、交易签名、硬件钱包接入和多语言界面等能力。

本仓库基于开源项目 [Rabby Mobile](https://github.com/RabbyHub/rabby-mobile) 演进，并完成了 CubeX Wallet 的品牌名称、应用图标、启动资源、主要界面、本地化文案和系统权限提示改造。为了保持上游依赖、历史数据和协议兼容性，部分内部包名、存储键、构建变量、Bundle Identifier 与深链标识仍沿用历史命名；这些内部标识不代表面向用户的产品品牌。

### 产品原则

- **自托管优先**：私钥、助记词和签名权限由用户自行控制。
- **交易透明**：在用户确认前展示交易对象、金额、网络、授权和风险信息。
- **跨平台一致**：在 iOS 与 Android 上提供统一的核心使用体验。
- **兼容现有生态**：支持常见 EVM 网络、WalletConnect、DApp 和硬件钱包工作流。
- **谨慎演进**：涉及密钥、签名、存储和迁移的修改必须经过专项测试与安全审查。

## 核心能力

- 创建或导入助记词钱包、私钥钱包和观察地址。
- 管理多个账户、地址、网络、代币与 NFT 资产。
- 通过内置 DApp 浏览器或 WalletConnect 连接第三方应用。
- 展示交易详情、授权对象、Gas 信息、模拟结果与风险提示。
- 支持转账、Swap、Bridge、借贷、永续合约等扩展场景。
- 支持 Ledger、Trezor、OneKey、Keystone、Gnosis Safe 等账户类型。
- 提供本地密码、生物识别、系统 Keychain/Keystore 与自动锁定能力。
- 提供英语、简体中文、繁体中文、日语、韩语及其他多语言界面。
- 提供开发诊断、性能日志、回归场景和本地调试工具。

> [!NOTE]
> 部分功能依赖远程 API、第三方协议、所在地区、构建环境或服务端配置。README 中列出的能力不构成对所有网络、资产或第三方服务永久可用的承诺。

## 技术栈

| 类别       | 主要技术                                                     |
| ---------- | ------------------------------------------------------------ |
| 移动端     | React Native 0.81.6、React 19、TypeScript 5.7                |
| 导航与界面 | React Navigation、Reanimated、Gesture Handler、Bottom Sheet  |
| 本地存储   | MMKV、SQLite、TypeORM、iOS Keychain、Android Keystore        |
| Web3       | EVM Provider、WalletConnect、硬件钱包 SDK、交易与签名模块    |
| 工程管理   | Yarn 4 Workspaces、CocoaPods、Gradle、Jest、ESLint、Prettier |
| 监控与调试 | Sentry、Reactotron、Rozenite、项目内诊断工具                 |

## 仓库结构

```text
.
├── apps/
│   ├── mobile/                 # CubeX Wallet React Native 主应用
│   ├── mobile-local-pages/     # 钱包内置本地页面
│   ├── dev-console-cra/        # 开发辅助控制台
│   └── go.rabby.io/            # 上游兼容页面与跳转应用
├── packages/
│   ├── service-keyring/        # 密钥与账户服务
│   ├── service-address/        # 地址数据服务
│   ├── providers/              # Provider 与消息通信能力
│   ├── react-native-keychain/  # 本地密钥安全存储封装
│   └── ...                     # 其他共享包和硬件钱包适配
├── scripts/                    # Monorepo 构建与维护脚本
├── .yarn/patches/              # 项目依赖补丁
└── README.md
```

主应用代码位于 [`apps/mobile`](apps/mobile)，共享基础能力位于 [`packages`](packages)。除非明确了解迁移影响，不建议仅为品牌统一而批量重命名内部包、数据库、持久化键或原生模块。

## 生产发布检查清单

当前仓库的品牌界面已更新为 CubeX Wallet，但正式发布前仍需要逐项确认以下内容：

- [ ] 替换或确认 OpenAPI、测试网 API、静态资源和下载服务地址。
- [ ] 配置独立的 WalletConnect/Reown Project ID 和客户端 Metadata。
- [ ] 配置 CubeX Wallet 自有域名、Universal Links、App Links 和深链协议。
- [ ] 确认 iOS Bundle Identifier、Android Application ID 与商店记录一致。
- [ ] 配置 Apple Developer Team、Android Keystore 和 CI 签名凭据。
- [ ] 替换 Firebase、推送通知、Sentry、统计分析和反馈服务配置。
- [ ] 对助记词、私钥、密码、生物识别和 Keychain/Keystore 迁移进行专项安全测试。
- [ ] 对交易构造、授权、模拟、签名和广播流程进行独立安全审查。
- [ ] 由法务审核隐私政策、服务条款、开源声明和所在地区合规要求。
- [ ] 准备 App Store 与 Google Play 的截图、描述、隐私标签、年龄分级和支持页面。
- [ ] 在干净设备上验证首次安装、升级安装、备份恢复、锁定和异常恢复流程。

不要把本地成功构建等同于生产发布就绪。钱包软件会直接处理用户资产和签名授权，任何配置、存储或交易流程错误都可能造成不可逆损失。

## 安全说明

- CubeX Wallet 是自托管钱包，项目维护者无法替用户恢复遗失的助记词、私钥或密码。
- 永远不要向任何人提供助记词、私钥、验证码或远程控制权限。
- 不要将真实资产用于开发、回归测试或未经审计的构建。
- 新增依赖前应检查维护状态、许可证、安装脚本和供应链风险。
- 修改签名、密钥环、数据库迁移、深链、WebView 注入或 Provider 行为时，应提供针对性测试。
- 安全问题不要通过公开 Issue 披露；请优先使用 GitHub Security Advisory 或仓库维护者指定的私密渠道。

## 隐私说明

应用内当前包含 CubeX Wallet 品牌化的本地隐私政策与服务条款文本，但这些内容仅用于开发阶段占位，不构成正式法律意见。上线前必须由适用司法辖区的专业法务人员审核，并补充真实运营主体、联系方式、数据处理目的、第三方服务、保留期限、用户权利和跨境传输说明。

第三方 DApp、RPC、WalletConnect、行情、交易、Bridge、借贷、永续合约、推送和分析服务可能适用各自的隐私政策与服务条款。

## 上游项目与兼容性

本项目参考并继承了 [RabbyHub/rabby-mobile](https://github.com/RabbyHub/rabby-mobile) 的工程结构、共享包和部分业务能力。感谢上游项目维护者与相关开源社区的工作。

为避免破坏已有能力，下列内容可能继续保留历史命名：

- `@rabby-wallet/*` 依赖包名。
- React Native 原生模块、Xcode Target 和 Gradle 内部标识。
- 数据库名称、MMKV Key、Keychain Service 与迁移标识。
- 构建环境变量、日志标签和测试工具名称。
- 用于识别第三方网站钱包入口的兼容选择器。

这些标识属于代码和数据兼容层，不应在没有迁移计划、向后兼容方案和完整测试的情况下直接替换。

## 许可证与品牌

本仓库包含上游开源代码、第三方依赖和 CubeX Wallet 品牌资源。各部分的使用、修改和分发应遵守对应的开源许可证、第三方条款及适用法律。

本仓库当前未在根目录提供独立的 `LICENSE` 文件。对外发布或商业分发前，应完成上游许可证核查、第三方 Notice 汇总，并添加适用于本项目的正式许可证文件。README 不能替代法律许可文件。

CubeX Wallet 的名称、图标和其他品牌素材不因源代码可见而自动授予商标或品牌使用权。

---

如需了解上游工程实现和历史背景，请参考 [Rabby Mobile](https://github.com/RabbyHub/rabby-mobile)。
