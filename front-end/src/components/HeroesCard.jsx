import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import styled from "styled-components"
import NewHero from "./NewHero"

const Container = styled.div`
    display : flex;
    flex-wrap : wrap;
    justify-content : space-between;
    padding : 40px 70px;
`
const HeroContainer = styled.div`
    margin-bottom : 30px;
    box-shadow : 0 20px 20px rgba(0,0,0,0.4);
    border-radius : 20px;
    padding-bottom : 10px;
    position : relative;
`
const Logo =  styled.i`
    font-size : 30px;
    bottom : 5px;
    right : 5px;
    color : red;
    position : absolute;
    text-shadow : 2px 2px 4px grey;
    cursor : pointer;
    &:hover {
        transform : scale(1.06)
    }
`
const Image = styled.img`
    height : 350px;
    width : 400px;
    border-top-left-radius : 20px;
    border-top-right-radius : 20px;
    object-fit : cover;
`
const Title = styled.h1`
    text-align : center;
    margin : 3px 0 10px 0;
`
const List = styled.ul`
`
const ListElement =  styled.li`
    list-style-type : none;
    margin-bottom : 15px;
`

const HeroesCard = () => {

    const [heroes, setHeroes] = useState()
    const onFetch = () => {
        fetch("http://localhost:5000/heroes")
        .then(response => response.json())
        .then(data => setHeroes(data))
    }
    useEffect(() => {
        onFetch()
    },[])

    const onClickDelete = (slug) => {
        fetch(`http://localhost:5000/heroes/${slug}`, {
            method : 'delete',
            headers:{
                'Content-type':'application/json'
            },
        })
        .then(response => response)
        .then(date => onFetch())
        
    }
    if(!heroes) {
        return <h1>chargement ...</h1>
    }

    return (
        <Container>
            <NewHero onFetch= {onFetch}/>
            {heroes.map((hero) => {
                return <HeroContainer>
                        <Logo 
                            className="fas fa-trash"
                            onClick={() => onClickDelete(hero.slug)}
                        >
                        </Logo>
                        <Link 
                            to = {`/hero/${hero.slug}`}
                            style={{textDecoration : "none", color : "black"}}
                            key = {hero.name}
                        >
                            <Image src={hero.image}/>
                            <div>
                                <Title>{hero.name}</Title>
                                <List>
                                    <ListElement>Power : {hero.power}</ListElement>
                                    <ListElement>Age : {hero.age} years</ListElement>
                                    <ListElement>Color : {hero.color}</ListElement>

                                </List>
                            </div>
                        </Link>
                        </HeroContainer>
            })}

        </Container>
    )
}

export default HeroesCard
