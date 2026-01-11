import React, { MouseEvent, useCallback, useEffect } from 'react'

interface ButtonProps {
	children?: React.ReactNode
	variant?: 'primary' | 'secondary'
	size?: 'small' | 'medium' | 'large'
	disabled?: boolean
	isLoading?: boolean
	type?: 'button' | 'submit' | 'reset'
	className?: string
	text?: string
	onClick?: (e: MouseEvent) => void
}

const Button = (props: ButtonProps) => {
	return <button {...props}>{props.text ? props.text : props.children}</button>
}

export default Button
