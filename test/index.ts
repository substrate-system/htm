import { test } from '@substrate-system/tapzero'
import { signal } from '@preact/signals'
import { render } from 'preact'
import { html } from 'htm/preact'
import { Button } from '../src/index.js'

test('Button renders with correct structure', async t => {
    t.plan(4)
    const container = document.createElement('div')
    render(html`<${Button}>Click Me<//>`, container)

    const button = container.querySelector('button')
    t.ok(button, 'should render a button element')
    t.ok(button?.classList.contains('btn'), 'should have "btn" class')

    const content = button?.querySelector('.btn-content')
    t.ok(content, 'should have btn-content wrapper')
    t.equal(content?.textContent, 'Click Me', 'should render children')
})

test('Button applies custom className', async t => {
    const container = document.createElement('div')
    render(html`<${Button} className="my-custom-class">Test<//>`, container)

    const button = container.querySelector('button')
    t.ok(button?.classList.contains('btn'), 'should have "btn" class')
    t.ok(button?.classList.contains('my-custom-class'),
        'should have custom class')
})

test('Button applies custom class prop', async t => {
    const container = document.createElement('div')
    render(html`<${Button} class="another-class">Test<//>`, container)

    const button = container.querySelector('button')
    t.ok(button?.classList.contains('another-class'), 'should apply class prop')
})

test('Button calls onClick handler', async t => {
    const container = document.createElement('div')
    let clicked = false

    render(
        html`<${Button} onClick=${() => { clicked = true }}>Click<//>`,
        container
    )

    const button = container.querySelector('button')
    button?.click()
    await sleep(0)

    t.ok(clicked, 'onClick handler should be called')
})

test('Button manages spinning state during async onClick', async t => {
    const container = document.createElement('div')
    let resolveClick:(() => void) | null = null
    const clickPromise = new Promise<void>(resolve => {
        resolveClick = resolve
    })

    render(html`<${Button}
        onClick=${async () => { await clickPromise }}>
        Async
    <//>`, container)

    const button = container.querySelector('button') as HTMLButtonElement

    t.equal(button.disabled, false, 'button should not be disabled initially')
    t.ok(!button.classList.contains('spinning'),
        'should not have spinning class initially')

    button.click()
    await sleep(0)

    t.equal(button.disabled, true, 'button should be disabled while spinning')
    t.ok(button.classList.contains('spinning'),
        'should have spinning class while async')

    resolveClick!()
    await sleep(0)

    t.equal(button.disabled, false,
        'button should not be disabled after completion')
    t.ok(!button.classList.contains('spinning'),
        'should remove spinning class after completion')
})

test('Button respects external isSpinning signal', async t => {
    const container = document.createElement('div')
    const isSpinning = signal(false)

    render(html`<${Button} isSpinning=${isSpinning}>External<//>`, container)

    const button = container.querySelector('button') as HTMLButtonElement

    t.equal(button.disabled, false,
        'should not be disabled when signal is false')

    isSpinning.value = true
    await sleep(0)

    t.equal(button.disabled, true, 'should be disabled when signal is true')
    t.ok(button.classList.contains('spinning'), 'should have spinning class')

    isSpinning.value = false
    await sleep(0)

    t.equal(button.disabled, false,
        'should not be disabled after signal set to false')
})

test('Button respects disabled prop', async t => {
    const container = document.createElement('div')
    render(html`<${Button} disabled=${true}>Disabled<//>`, container)

    const button = container.querySelector('button') as HTMLButtonElement
    t.equal(button.disabled, true, 'should be disabled when prop is true')
})

test('Button disabled prop takes precedence over spinning', async t => {
    const container = document.createElement('div')
    const isSpinning = signal(false)

    render(
        html`<${Button} disabled=${true} isSpinning=${isSpinning}>Both<//>`,
        container
    )

    const button = container.querySelector('button') as HTMLButtonElement
    t.equal(button.disabled, true,
        'should remain disabled regardless of spinning state')
})

test('all done', () => {
    // @ts-expect-error tests
    window.testsFinished = true
})

function sleep (ms:number):Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}
