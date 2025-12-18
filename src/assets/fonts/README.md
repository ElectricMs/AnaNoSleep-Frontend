# 字体文件目录

## 使用说明

将你的自定义字体文件放在此目录下。

## 推荐的字体格式

1. **WOFF2** (推荐) - 最佳压缩率，现代浏览器支持
2. **WOFF** - 良好的压缩率，广泛支持
3. **TTF/OTF** - 作为后备选项

## 字体文件命名建议

- `字体名-Regular.woff2` - 常规字重
- `字体名-Bold.woff2` - 粗体
- `字体名-Light.woff2` - 细体
- `字体名-Medium.woff2` - 中等字重

## 如何添加字体

1. 将字体文件复制到此目录
2. 在 `client/src/assets/css/main.scss` 中添加 `@font-face` 声明
3. 更新 `font-family` 使用你的字体名称

## 字体转换工具

如果只有 TTF/OTF 格式，可以使用以下工具转换为 WOFF2：

- 在线工具：https://cloudconvert.com/ttf-to-woff2
- 命令行工具：`woff2_compress` (需要安装 Google 的 woff2 工具)

## 注意事项

- 字体文件大小会影响页面加载速度，建议只包含需要的字重和字符集
- 使用 `font-display: swap` 可以优化字体加载体验
- 始终提供系统字体作为后备选项

