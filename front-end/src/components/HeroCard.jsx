import { useEffect, useState } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"

const Container = styled.div`
    display : flex;
    justify-content: center;
    padding-top : 20px;
`
const HeroContainer = styled.div`
    margin-bottom : 30px;
    box-shadow : 0 20px 20px rgba(0,0,0,0.4);
    border-radius : 20px;
    cursor : pointer;
`
const Image = styled.img`
    height : 450px;
    width : 500px;
    border-top-left-radius : 20px;
    border-top-right-radius : 20px;
    object-fit : cover;
`
const Title = styled.h1`
    text-align : center;
    margin : 3px 0 10px 0;
`
const List = styled.ul`
    display : flex;
    flex-direction : column;
    gap : 15px;
`
const ListElement =  styled.li`
    list-style-type : none;
`
const PowerContainer = styled.div`
    display : flex;
    justify-content : space-between; 
    padding-right : 40px;
`
const Logo = styled.i`
    font-size : 25px;
    color : green;
`
const Input = styled.input`
    border : none;
    border-bottom : 2px solid black;
    outline : none;
`
const Button = styled.button`
    background : #fff;
    border : 2px solid green;
    border-radius : 20px;
    padding : 2px 10px;
    // font-size : 15px;
    &:hover {
        background : green;
        color : #fff;
    }
`
const HeroCard = () => {
    const {slug} = useParams()
    const [heroes, setHeroes] = useState()
    const [write, setWrite] = useState(false)
    const [value, setValue] = useState()
    
    const onFetch = () => {
        fetch(`http://localhost:5000/heroes/${slug}`)
        .then(response => response.json())
        .then(data => setHeroes(data))
    }
    useEffect(() => {
        onFetch()
    }, [slug])
    
    const onLogoClick = () => {
        setWrite(true)
    }
    const onButtonClick = slug => {
        setWrite(false)
        fetch(`http://localhost:5000/heroes/${slug}/powers`, {
            method : 'put',
            headers:{
                'Content-type':'application/json'
            },
            body : JSON.stringify({power : value})
        })
        .then(response => response.json())
        .then(data => onFetch())

    }

    const onValueChange = (e) => {
        setValue(e.target.value)
    }

    if(!heroes) {
        return <h1>Chargement ...</h1>
    }
    console.log(heroes);
    return (
        <Container>
            <HeroContainer>
                <Image src={heroes.image}/>
                <div>
                    <Title>{heroes.name}</Title>
                    <List>
                        <ListElement>
                            <PowerContainer>
                                Power : {heroes.power}
                                {
                                    !write ? 
                                    <Logo 
                                        className="far fa-plus-square"
                                        onClick={onLogoClick}
                                    >
                                    </Logo> : 
                                    <>
                                        <Input 
                                            onChange={onValueChange}
                                            type="text" 
                                            autoFocus
                                        />
                                        <Button 
                                            onClick={() => onButtonClick(heroes.slug)}
                                        >
                                            valid
                                        </Button>
                                    </>
                                }
                            </PowerContainer>
                        </ListElement>
                        <ListElement>Age : {heroes.age} years</ListElement>
                        <ListElement>Color : {heroes.color}</ListElement>
                    </List>
                </div>
            </HeroContainer>
        </Container>
    )
}

export default HeroCard
