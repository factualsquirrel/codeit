import React, { useState, useEffect } from 'react'
import SplitPane from 'react-split-pane'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import styles from '../styles/web.module.css'
const Editor = dynamic(import('./components/editor'), {ssr: false})

function WebCompiler() {
	const [height, setHeight] = useState('485px')

	const [html, setHTML] = useState('')
	const [css, setCSS] = useState('')
	const [js, setJS] = useState('')
	const [output, setOutput] = useState('')

	const router = useRouter()
	const { id } = router.query
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setOutput(`
				<html>
					<head><style>${css}</style></head>
					<body>${html}</body>
					<script>${js}</script>
				</html>
			`)
		}, 500)
		return () => {clearTimeout(timer)}
	}, [html, css, js])

	useEffect(() => {
		async function getPen() {
			const res = await fetch(`http://localhost:3000/api/pens/${id}`)
			const { data } = await res.json()

			if(res.status !== 200) {
				await router.push('/404')
			}

			setHTML(data.html)
			setCSS(data.css)
			setJS(data.js)
			setLoading(false)
		}

		if(id) {
			setLoading(true)
			getPen()
		} else {
			setLoading(false)
		}
	}, [id])

	if(loading) {
		return <div className={'loader'}>Loading...</div>
	}

	return (
		<SplitPane split="horizontal" minSize={"50%"} onDragFinished={ (height) => {setHeight(`${height - 40}px`)} }>
			<SplitPane split="vertical" minSize={"33%"}>
				<Editor title="HTML" mode="html" value={html} onChange={setHTML} height={height} />
				<SplitPane split="vertical" minSize={"50%"}>
					<Editor title="CSS" mode="css" value={css} onChange={setCSS} height={height} />
					<Editor title="JS" mode="javascript" value={js} onChange={setJS} height={height} />
				</SplitPane>
			</SplitPane>
			<iframe className={styles.preview} srcDoc={output} />
		</SplitPane>
	)
}

export default WebCompiler
