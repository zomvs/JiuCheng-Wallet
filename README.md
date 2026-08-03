<p align="center">
  <img src="apps/mobile/src/assets/brand/jiucheng-app-icon.svg" width="128" height="128" alt="JiuCheng Wallet App Icon" />
</p>

<h1 align="center">JiuCheng Wallet</h1>

<p align="center">
  面向 iOS 与 Android 的自托管 Web3 钱包客户端
</p>

<p align="center">
  <strong>安全地管理账户、资产、DApp 连接与链上交易。</strong>
</p>

> [!IMPORTANT]
> JiuCheng Wallet 当前处于持续开发阶段。本仓库可以用于本地开发、功能验证和二次开发，但在正式发布到 App Store、Google Play 或向真实用户提供服务前，必须完成本文中的生产环境检查清单、安全审查和法务审核。

## 项目简介

JiuCheng Wallet 是一个基于 React Native 构建的跨平台自托管钱包项目，支持 iOS 与 Android。项目以移动端钱包体验为核心，提供账户管理、资产展示、DApp 连接、交易签名、硬件钱包接入和多语言界面等能力。

本仓库基于开源项目 [Rabby Mobile](https://github.com/RabbyHub/rabby-mobile) 演进，并完成了 JiuCheng Wallet 的品牌名称、应用图标、启动资源、主要界面、本地化文案和系统权限提示改造。为了保持上游依赖、历史数据和协议兼容性，部分内部包名、存储键、构建变量、Bundle Identifier 与深链标识仍沿用历史命名；这些内部标识不代表面向用户的产品品牌。

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
│   ├── mobile/                 # JiuCheng Wallet React Native 主应用
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

## 开发环境要求

### 通用环境

- macOS、Linux 或 Windows。iOS 开发必须使用 macOS。
- Node.js `22` 或更高版本。
- Corepack，以及仓库声明的 Yarn `4.12.0`。
- Git。
- 至少 16 GB 内存；首次安装和原生编译需要较多磁盘空间。

### iOS

- Xcode，以及对应版本的 iOS Simulator Runtime。
- Xcode Command Line Tools。
- Ruby `2.6.10` 或更高版本。
- CocoaPods `1.13` 或更高版本，但不要使用 `1.15.0` 或 `1.15.1`。
- 如需真机调试或发布，需要有效的 Apple Developer Team、证书和 Provisioning Profile。

### Android

- Android Studio。
- JDK 17。
- Android SDK Platform 36。
- Android Build Tools 35.0.0。
- Android NDK 27.3.13750724。
- Android Emulator 或已启用 USB 调试的真机。

项目当前 `minSdkVersion` 为 26、`targetSdkVersion` 为 35、`compileSdkVersion` 为 36。

建议先按照 [React Native 环境配置文档](https://reactnative.dev/docs/set-up-your-environment) 完成系统依赖安装，然后运行：

```bash
yarn workspace rabby-mobile doctor
```

## 快速开始

### 1. 克隆仓库

```bash
git clone git@github.com:zomvs/JiuCheng-Wallet.git JiuCheng-Wallet
cd JiuCheng-Wallet
```

也可以使用 HTTPS：

```bash
git clone https://github.com/zomvs/JiuCheng-Wallet.git JiuCheng-Wallet
cd JiuCheng-Wallet
```

### 2. 启用 Yarn 并安装依赖

```bash
corepack enable
yarn setup
```

`yarn setup` 会安装 Git Hooks，并使用锁文件执行不可变依赖安装。请不要使用 npm 或 pnpm 替代项目声明的 Yarn 版本，也不要无故重新生成 `yarn.lock`。

如果当前 Shell 无法解析 `yarn`，可以直接使用仓库自带的 Yarn：

```bash
node .yarn/releases/yarn-4.12.0.cjs setup
```

### 3. 安装 iOS Pods

```bash
yarn workspace rabby-mobile ios:installpod
```

如果机器安装了多个 Xcode，可以先指定当前 Xcode：

```bash
export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer
```

### 4. 配置生产环境

默认的 iOS 和 Android 运行命令使用 `Release` 构建、`production` 环境和 `appstore` 渠道。首次运行前，复制生产环境模板：

```bash
cp apps/mobile/.env.production.example apps/mobile/.env.production
```

编辑 `apps/mobile/.env.production`，替换所有 `REPLACE_WITH_...` 占位值。`RABBY_MOBILE_KR_PWD` 和 `RABBY_MOBILE_CODE` 必须使用稳定的生产值；应用发布后随意更改可能影响既有用户的数据兼容和解锁流程。

生产环境文件和签名凭据不会提交到 Git，应通过本机安全存储或 CI Secret 注入。

### 5. 运行 iOS 正式模式

```bash
yarn workspace rabby-mobile ios
```

该命令使用 Xcode `Release` 配置并直接打包 JavaScript Bundle，不启动 Metro。真机安装或归档还需要 JiuCheng Wallet 自有的 Apple Developer Team、证书和 Provisioning Profile。

指定模拟器：

```bash
yarn workspace rabby-mobile ios --simulator "iPhone 17 Pro"
```

也可以打开 [`apps/mobile/ios/RabbyMobile.xcworkspace`](apps/mobile/ios/RabbyMobile.xcworkspace)，选择 `RabbyMobile` Scheme，并将运行配置设为 `Release`。

### 6. 运行 Android 正式模式

先启动 Android Emulator，或连接已启用 USB 调试的设备，然后运行：

```bash
yarn workspace rabby-mobile android
```

该命令使用 Gradle `release` 变体且不启动 Metro。正式签名需要通过 `gradle.properties` 或 `RABBY_MOBILE_ANDROID_*` 环境变量配置 JiuCheng Wallet 自有 Keystore。

可以通过以下命令确认设备连接状态：

```bash
adb devices
```

### 7. 使用 Debug 模式开发

需要热更新、React Native Dev Menu 或调试工具时，在第一个终端窗口启动 Metro：

```bash
yarn start
```

然后在第二个终端窗口显式运行 Debug 命令：

```bash
yarn workspace rabby-mobile ios:debug
# 或
yarn workspace rabby-mobile android:debug
```

Debug 模式仅用于开发和测试，不得作为 App Store、Google Play 或其他公开分发渠道的交付包。

## 环境变量

Debug 环境变量建议放在 `apps/mobile/.env.local`，生产环境变量放在 `apps/mobile/.env.production`。这两个文件均已被 Git 忽略，不应提交到仓库。生产配置可以从 [`apps/mobile/.env.production.example`](apps/mobile/.env.production.example) 创建。

```dotenv
RABBY_MOBILE_BUILD_ENV=regression
RABBY_MOBILE_BUILD_CHANNEL=selfhost-reg
RABBY_MOBILE_KR_PWD=<local-development-secret>
RABBY_MOBILE_CODE=<local-build-code>
RABBY_MOBILE_WALLETCONNECT_PROJECT_ID=<walletconnect-project-id>
RABBY_MOBILE_FE_SERVICE_URL=<optional-service-url>
```

| 变量                                    | 用途                             | 建议                              |
| --------------------------------------- | -------------------------------- | --------------------------------- |
| `RABBY_MOBILE_BUILD_ENV`                | 选择 `production` 或回归构建环境 | 本地开发使用 `regression`         |
| `RABBY_MOBILE_BUILD_CHANNEL`            | 控制构建渠道和部分运行策略       | 本地开发使用 `selfhost-reg`       |
| `RABBY_MOBILE_KR_PWD`                   | 内置密钥环初始化与迁移参数       | 视为敏感信息，不得提交            |
| `RABBY_MOBILE_CODE`                     | 原生构建与兼容校验参数           | 生产环境由安全渠道注入            |
| `RABBY_MOBILE_WALLETCONNECT_PROJECT_ID` | WalletConnect 项目标识           | 从 WalletConnect/Reown 控制台申请 |
| `RABBY_MOBILE_FE_SERVICE_URL`           | 非公开环境的可选前端服务地址     | 不需要时留空                      |

这些变量中的 `RABBY_MOBILE_*` 前缀属于上游兼容层。更改变量名称会影响 Babel、Metro、原生构建脚本、CI 和已发布版本的兼容逻辑，因此不应仅为品牌改名而直接删除或替换。

> [!WARNING]
> 不要在 Issue、Pull Request、构建日志、截图或聊天记录中公开真实的密钥环密码、助记词、私钥、签名证书、API Token、WalletConnect Secret、Firebase 配置或生产服务凭据。

## 常用开发命令

| 命令                                             | 说明                                   |
| ------------------------------------------------ | -------------------------------------- |
| `yarn start`                                     | 启动 Metro 与移动端开发依赖            |
| `yarn workspace rabby-mobile restart`            | 清理 Metro 缓存并重新启动              |
| `yarn workspace rabby-mobile ios`                | 使用生产环境构建并运行 iOS Release     |
| `yarn workspace rabby-mobile android`            | 使用生产环境构建并运行 Android Release |
| `yarn workspace rabby-mobile ios:debug`          | 使用 Metro 构建并运行 iOS Debug        |
| `yarn workspace rabby-mobile android:debug`      | 使用 Metro 构建并运行 Android Debug    |
| `yarn workspace rabby-mobile doctor`             | 检查 React Native 开发环境             |
| `yarn build`                                     | 构建 Monorepo TypeScript 依赖          |
| `yarn workspace rabby-mobile typecheck`          | 执行移动端 TypeScript 检查             |
| `yarn workspace rabby-mobile lint:cycles`        | 使用 Madge 检查循环依赖                |
| `yarn workspace rabby-mobile lint:cycles:eslint` | 使用 ESLint 再次检查循环依赖           |
| `yarn workspace rabby-mobile test --runInBand`   | 串行运行移动端 Jest 测试               |
| `yarn lint`                                      | 执行仓库级 ESLint、Prettier 与约束检查 |

## 质量要求

修改 `apps/mobile` 后，提交前至少运行：

```bash
yarn workspace rabby-mobile lint:cycles
yarn workspace rabby-mobile lint:cycles:eslint
yarn workspace rabby-mobile typecheck
yarn workspace rabby-mobile test --runInBand
```

对原生资源、图标、启动页或构建配置进行修改时，还应完成对应平台的实际构建，并在模拟器或真机上检查：

- 应用名称和桌面图标。
- 启动页、深色模式与首屏布局。
- 权限申请说明。
- Bundle Identifier、签名和构建渠道。
- 升级安装后的本地数据兼容性。

## 生产发布检查清单

当前仓库的品牌界面已更新为 JiuCheng Wallet，但正式发布前仍需要逐项确认以下内容：

- [ ] 替换或确认 OpenAPI、测试网 API、静态资源和下载服务地址。
- [ ] 配置独立的 WalletConnect/Reown Project ID 和客户端 Metadata。
- [ ] 配置 JiuCheng Wallet 自有域名、Universal Links、App Links 和深链协议。
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

- JiuCheng Wallet 是自托管钱包，项目维护者无法替用户恢复遗失的助记词、私钥或密码。
- 永远不要向任何人提供助记词、私钥、验证码或远程控制权限。
- 不要将真实资产用于开发、回归测试或未经审计的构建。
- 新增依赖前应检查维护状态、许可证、安装脚本和供应链风险。
- 修改签名、密钥环、数据库迁移、深链、WebView 注入或 Provider 行为时，应提供针对性测试。
- 安全问题不要通过公开 Issue 披露；请优先使用 GitHub Security Advisory 或仓库维护者指定的私密渠道。

## 隐私说明

应用内当前包含 JiuCheng Wallet 品牌化的本地隐私政策与服务条款文本，但这些内容仅用于开发阶段占位，不构成正式法律意见。上线前必须由适用司法辖区的专业法务人员审核，并补充真实运营主体、联系方式、数据处理目的、第三方服务、保留期限、用户权利和跨境传输说明。

第三方 DApp、RPC、WalletConnect、行情、交易、Bridge、借贷、永续合约、推送和分析服务可能适用各自的隐私政策与服务条款。

## 贡献指南

欢迎通过 [Issues](https://github.com/zomvs/JiuCheng-Wallet/issues) 报告可复现的问题，或通过 Pull Request 提交改进。

建议流程：

1. 从最新代码创建功能分支。
2. 保持改动范围清晰，避免无关格式化或大规模重命名。
3. 为关键逻辑、迁移和回归场景补充测试。
4. 完成类型检查、循环依赖检查和 Jest 测试。
5. 在 Pull Request 中说明影响范围、验证方式、风险和回滚方案。

涉及钱包安全、账户恢复、签名、授权、存储、数据库或生产发布的改动，需要更严格的评审和实际设备验证。

## 上游项目与兼容性

本项目参考并继承了 [RabbyHub/rabby-mobile](https://github.com/RabbyHub/rabby-mobile) 的工程结构、共享包和部分业务能力。感谢上游项目维护者与相关开源社区的工作。

为避免破坏已有能力，下列内容可能继续保留历史命名：

- `@rabby-wallet/*` 依赖包名。
- React Native 原生模块、Xcode Target 和 Gradle 内部标识。
- 数据库名称、MMKV Key、Keychain Service 与迁移标识。
- 构建环境变量、日志标签和测试工具名称。
- 用于识别第三方网站钱包入口的兼容选择器。

这些标识属于代码和数据兼容层，不应在没有迁移计划、向后兼容方案和完整测试的情况下直接替换。

## 常见问题

### Metro 端口被占用

检查 8081 端口：

```bash
lsof -i :8081
```

如果已有正确的 Metro 实例，请复用它并在运行命令后添加 `--no-packager`。如果是无关进程，请先确认进程身份，再安全停止。

### iOS Pods 与 Podfile.lock 不一致

先确认 Node 依赖已经使用仓库锁文件正确安装，然后运行：

```bash
yarn workspace rabby-mobile ios:installpod
```

不要随意删除或提交大范围变化的 `Podfile.lock`。如果必须升级 Pods，应在独立变更中说明原因并完成原生构建验证。

### Xcode 命令行工具指向错误

```bash
export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer
xcodebuild -version
```

### Android 找不到 Java

确认已安装 JDK 17，并让 `JAVA_HOME` 指向正确路径：

```bash
java -version
echo "$JAVA_HOME"
```

### 修改环境变量后没有生效

Metro 会把环境输入计入缓存，但切换构建环境后仍建议重新启动：

```bash
yarn workspace rabby-mobile restart
```

## 许可证与品牌

本仓库包含上游开源代码、第三方依赖和 JiuCheng Wallet 品牌资源。各部分的使用、修改和分发应遵守对应的开源许可证、第三方条款及适用法律。

本仓库当前未在根目录提供独立的 `LICENSE` 文件。对外发布或商业分发前，应完成上游许可证核查、第三方 Notice 汇总，并添加适用于本项目的正式许可证文件。README 不能替代法律许可文件。

JiuCheng Wallet 的名称、图标和其他品牌素材不因源代码可见而自动授予商标或品牌使用权。

---

如需了解上游工程实现和历史背景，请参考 [Rabby Mobile](https://github.com/RabbyHub/rabby-mobile)。
