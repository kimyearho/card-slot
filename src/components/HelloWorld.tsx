'use client'

import { useEffect, useMemo, useState } from 'react'
import Button from './buttons/Button'

interface HelloWorldProps {
	name?: string
}

const HelloWorld = ({ name = 'world' }: HelloWorldProps) => {
	useEffect(() => {
		console.log('Hello, world!')
	}, [])

	const handleClick = (message?: string) => {
		alert(`click ${message}`)
	}

	return (
		<>
			<div>Hello, {name}</div>
			<Button
				type="button"
				className="border-1 bg-blue-400 p-1 font-bold text-amber-50"
				onClick={() => handleClick('Hello, world! 1')}
				text={'button1'}
			/>
			<Button
				type="button"
				className="border-1 bg-blue-400 p-1 font-bold text-amber-50"
				onClick={() => handleClick('Hello, world! 2')}
				text={'button2'}
			/>
		</>
	)
}

export default HelloWorld
