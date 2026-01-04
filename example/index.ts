import { type FunctionComponent, render } from 'preact'
import { html } from 'htm/preact'
import { useCallback } from 'preact/hooks'
import Debug from '@substrate-system/debug'
import { useSignal } from '@preact/signals'
import { Button } from '../src/index.js'
const debug = Debug('htm:example')

if (import.meta.env.DEV) {
    localStorage.setItem('DEBUG', 'htm,htm:*')
} else {
    localStorage.removeItem('DEBUG')
}

const Example:FunctionComponent<unknown> = function () {
    const resolving = useSignal<boolean>(false)

    const click = useCallback(async (ev:MouseEvent) => {
        ev.preventDefault()
        debug('got a click', ev)
        resolving.value = true
        await sleep(2000)  // 2 seconds
        resolving.value = false
    }, [])

    return html`<div>
        <p>hello</p>
        <${Button} isSpinning=${resolving} onClick=${click}>
            Example Clicks
        <//>
    </div>`
}

render(html`<${Example} />`, document.getElementById('root')!)

function sleep (ms:number):Promise<void> {
    return new Promise<void>(resolve => {
        setTimeout(resolve, ms)
    })
}
