/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    // すべてのNext.js環境変数は自動的に取り込まれます
    // NEXT_PUBLIC_プレフィックスを持つ環境変数はクライアントサイドで利用可能になります
}

module.exports = nextConfig
