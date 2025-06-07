/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    // Azureデプロイに最適な設定
    distDir: 'build',
    // クライアントサイドレンダリングのみを強制
    reactStrictMode: true,
    // 静的生成から動的ページを除外
    skipTrailingSlashRedirect: true,
    skipMiddlewareUrlNormalize: true,
}

module.exports = nextConfig
