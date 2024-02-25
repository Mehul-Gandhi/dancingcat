function Welcome(props) {
    console.log(props)
    return (
        <h1>Welcome, {props.name}</h1>
    )
}

export default Welcome;