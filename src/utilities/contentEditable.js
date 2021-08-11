
export const selectAlltext = (e) => {
    e.target.focus()
    e.target.select()
}
export const saveContentEnterPress = (e) => {
    if (e.keyCode === 13) {
        e.target.blur()
    }
}