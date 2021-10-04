async function getSave (req, res) {
    const {
        query: { id },
        method,
    } = req
    switch(method) {
        case "PUT":
            const newID = Math.floor(Math.random() * (100-1) + 1)
            res.status(200).json({ success: true, data: { newRecord: newID } })
            break
        case "POST":
            res.status(200).json({ success: true, data: { upadtedRecord: true } })
            break
        case "GET":
            const data = {
                html: `<div>pen ${id}</div>`,
                css: `div { color: blue }`,
                js: `console.log('ok')`
            }
            res.status(200).json({ data })
            break
        default:
            res.status(400).json({ success: false, data: "default" })
            break
    }
}

export default getSave