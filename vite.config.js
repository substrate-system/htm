// @ts-check
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        global: 'globalThis'
    },
    root: 'example',
    resolve: {
        alias: {
            // Allow testing package imports locally
            '@substrate-system/htm': resolve(__dirname, 'dist')
        }
    },
    plugins: [
        preact({
            devtoolsInProd: false,
            prefreshEnabled: true,
        })
    ],
    // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
    esbuild: {
        logOverride: { 'this-is-undefined-in-esm': 'silent' }
    },
    publicDir: '_public',
    css: {
        transformer: 'lightningcss',
        lightningcss: {
            targets: browserslistToTargets(browserslist('>= 0.25%')),
        },
    },
    server: {
        port: 8888,
        host: true,
        open: true,
    },
    build: {
        cssMinify: 'lightningcss',
        minify: false,
        outDir: '../public',
        emptyOutDir: true,
        sourcemap: 'inline'
    }
})
