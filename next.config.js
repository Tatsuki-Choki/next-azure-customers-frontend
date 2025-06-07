/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    // Azureデプロイに最適な設定
    distDir: 'build',
    // クライアントサイドレンダリングのみを強制
    reactStrictMode: true,
    swcMinify: true,
    // 静的生成を無効化して動的ルートの問題を回避
    trailingSlash: true,
}

module.exports = nextConfig
