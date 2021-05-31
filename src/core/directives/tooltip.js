export default {
    beforeMount(el, bindings) {
        const tooltip = document.createElement('div')
        const text = document.createTextNode(bindings.value)
        tooltip.append(text)
        tooltip.className = 'hidden absolute px-3 py-2 text-sm text-white bg-gray-700 rounded-md left-1/2 transform -translate-x-1/2 text-center'
        el.style.position = 'relative'
        el.appendChild(tooltip)

        el.firstChild.addEventListener('mouseover', () => {
            if (!tooltip.classList.contains('block')){
                tooltip.classList.add('block')
            }
            tooltip.classList.remove('hidden')
        })

        el.firstChild.addEventListener('mouseout', () => {
            if (!tooltip.classList.contains('hidden')){
                tooltip.classList.add('hidden')
            }
            tooltip.classList.remove('block')
        })
    }
}