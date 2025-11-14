# 网站部署指南

本指南将帮助您将五月天卜卜互动应用部署到互联网上，让其他人可以通过网页链接访问。

## 一、部署所需的文件清单

在部署前，请确保您拥有以下所有必要文件，并保持正确的文件夹结构：

```
/
├── index.html         # 主页面
├── styles.css         # 样式文件
├── script.js          # 脚本文件
├── manifest.json      # PWA应用清单
├── service-worker.js  # 离线支持服务工作器
├── download.html      # 下载页面
└── images/            # 图片文件夹
    ├── 阿信卜卜.png       # 阿信卜卜图片
    ├── box-closed.svg  # 宝箱关闭状态图片
    ├── box-open.svg    # 宝箱打开状态图片
    └── welcome-image.svg # 欢迎图片
```

## 二、部署选项

### 选项1：使用 GitHub Pages（免费）

GitHub Pages 是一个免费的静态网站托管服务，非常适合部署这类纯前端项目。

#### 步骤：

1. **创建 GitHub 账号**（如果还没有）
   - 访问 https://github.com 注册账号

2. **创建新仓库**
   - 登录后，点击右上角的 "+" 按钮，选择 "New repository"
   - 为仓库命名（如 "mayday-interactive"）
   - 选择公开仓库（Public）
   - 点击 "Create repository"

3. **上传文件到仓库**
   - 在仓库页面，点击 "Upload files"
   - 拖拽所有文件（包括文件夹）到上传区域
   - 滚动到底部，点击 "Commit changes"

4. **启用 GitHub Pages**
   - 在仓库页面，点击 "Settings"（设置）
   - 滚动到 "GitHub Pages" 部分
   - 在 "Source" 下拉菜单中选择 "main" 分支
   - 点击 "Save"
   - 等待几秒钟，页面会刷新，显示您的网站URL（如 https://yourusername.github.io/mayday-interactive/）

5. **访问您的网站**
   - 使用显示的 URL 访问您的网站
   - 分享这个链接给其他人，他们就可以访问了

### 选项2：使用 Netlify（免费）

Netlify 是另一个优秀的静态网站托管服务，提供免费计划和更强大的功能。

#### 步骤：

1. **创建 Netlify 账号**（如果还没有）
   - 访问 https://www.netlify.com 注册账号

2. **部署网站**
   - 登录后，点击 "Add new site" → "Deploy manually"
   - 拖拽所有文件（包括文件夹）到上传区域
   - Netlify 会自动部署您的网站

3. **获取网站链接**
   - 部署完成后，您会看到一个随机生成的 URL（如 https://random-name.netlify.app）
   - 您可以在 "Site settings" 中自定义域名（需要额外设置）

### 选项3：使用 Vercel（免费）

Vercel 也是一个流行的静态网站托管服务，部署过程简单快捷。

#### 步骤：

1. **创建 Vercel 账号**（如果还没有）
   - 访问 https://vercel.com 注册账号

2. **部署网站**
   - 登录后，点击 "New Project"
   - 选择 "Import Project" → "Import Git Repository" 或直接拖拽文件上传
   - 按照提示完成部署

3. **获取网站链接**
   - 部署完成后，您会获得一个免费的 URL（如 https://project-name.vercel.app）

### 选项4：使用传统的 Web 服务器

如果您有自己的 Web 服务器或虚拟主机，可以直接上传文件到服务器。

#### 步骤：

1. **准备 FTP 工具**
   - 推荐使用 FileZilla、WinSCP 等 FTP 客户端

2. **连接到您的服务器**
   - 使用您的主机提供商提供的 FTP 信息（主机地址、用户名、密码）连接到服务器

3. **上传文件**
   - 将所有文件上传到服务器的网站根目录（通常是 public_html、www 或 htdocs 文件夹）
   - 保持相同的文件和文件夹结构

4. **访问您的网站**
   - 如果您有域名，使用域名访问（如 https://yourdomain.com）
   - 或者使用服务器的 IP 地址访问

## 三、部署后注意事项

1. **检查所有链接**
   - 确保网站上的所有链接都正常工作
   - 特别是下载链接和图片引用

2. **测试跨浏览器兼容性**
   - 在不同浏览器中测试您的网站
   - 确保在移动设备和桌面设备上都能正常显示

3. **PWA 功能确认**
   - 检查 manifest.json 和 service-worker.js 是否正确加载
   - 确认应用可以被添加到主屏幕

4. **性能优化**
   - 考虑压缩图片以提高加载速度
   - 可以使用工具如 Google PageSpeed Insights 分析并优化性能

## 四、常见问题解决

1. **图片不显示**
   - 检查图片路径是否正确
   - 确保文件名大小写与代码中的引用一致

2. **脚本不工作**
   - 检查浏览器控制台是否有错误
   - 确保所有 JavaScript 文件都正确加载

3. **PWA 功能不可用**
   - 确认 manifest.json 和 service-worker.js 路径正确
   - 检查 HTTPS 是否正确配置（PWA 需要 HTTPS）

4. **微信分享问题**
   - 如果在微信中分享后显示异常，可能需要配置微信的 JS-SDK
   - 参考微信官方文档进行配置

## 五、更新网站

当您需要更新网站内容时：

1. **修改本地文件**
2. **重新上传修改过的文件**
3. **如果使用 CDN，可能需要清除缓存**

---

按照上述步骤操作，您的五月天卜卜互动应用就可以成功部署到互联网上，让其他人通过网页链接访问了！