import styled from "styled-components"
import { useState, useEffect } from "react"
const AddHero = styled.div`
    position : absolute;
    // position : relative;
    display : flex;
    flex-direction : column;
    top : 0px;
    left : 0px;
    z-index : 4;
    cursor : pointer
    // gap : 20px;
    width : 400px;
    justify-content : ${(props) => props.truth && "center"} ;
    background-color : ${(props) => props.truth ? "rgba(0,0,0,0.5)" : "#fff" } ;
    height : 100vh;
`
const CreateHero = styled.div`
    display : flex;
    flex-direction : column;
    gap : 20px;
    align-items : center;
    // background-color : rgba(0,0,0,0.6)
    width : 100vw;
    // height : 100vh;
    // position : absolute;
    // left : 40%;
    // z-index : 5;
`
const Logo = styled.i`
    font-size : 50px;
    color : green;
`
const Input = styled.input`
    width : 45%;
    height : 40px;
    font-size : 30px;
    padding-left : 20px;
    border-radius : 10px;
`
// const Selection = styled.div`
//     // font-size : 25px;
//     color : dark;
//     width : 45%;
//     display : flex;
//     justify-content : center;
//     align-items : center;
//     height : 30px;
//     gap : 20%;
// `
// const SelectionTitle = styled.h1`
//     color : dark;
//     text-shadow : 2px 2px 2px black;
// `
// const Select = styled.select`
//     width : 100px;
//     height : 40px;
//     font-size : 20px;
// `
// const Option = styled.option`
//     font-size : 20px;
// `
const Button = styled.button`
    background-color : #fff;
    border : 2px solid green;
    padding : 4px 20px;
    border-radius: 20px;
    font-size : 20px;
    &:hover {
        background-color : green;
        color : #fff;
    }
`
const NewHero = ({onFetch}) => {
    const [write, setWrite] = useState(false)
    const [name, setName] = useState()
    const [power, setPower] = useState()
    const [color, setColor] = useState()
    const [age, setAge] = useState()
    const [image, setImage] = useState()

    const onLogoClick = () => {
        setWrite(true)
    }
    
    const onButtonClick = () => {
        setWrite(false)
        fetch(`http://localhost:5000/heroes`, {
            method : 'post',
            headers:{
                'Content-type':'application/json'
            },
            body : JSON.stringify({
                slug : name,
                power : power,
                color : color,
                age : age,
                image : image,
                name
            })
        })
        .then(response => response)
        .then(data => onFetch())
    
    }
    
    const onNameValueChange = (e) => {
        setName(e.target.value)
    }
    const onPowerValueChange = (e) => {
        setPower(e.target.value)
    }
    const onColorValueChange = (e) => {
        setColor(e.target.value)
    }
    const onAgeValueChange = (e) => {
        setAge(e.target.value)
    }
    const onImageValueChange = (e) => {
        setImage(e.target.value)
    }
    return (
            <AddHero truth = {write}>
                {
                    !write ? 
                    <Logo 
                        className="far fa-plus-square"
                        onClick={onLogoClick}
                    >
                    </Logo> : 
                    <CreateHero>
                        <Input 
                            onChange={onNameValueChange}
                            type="text"
                            placeholder="Name" 
                        />
                        <Input 
                            onChange={onPowerValueChange}
                            type="text"
                            placeholder="power"
                        />
                        <Input 
                            onChange={onColorValueChange}
                            type="text" 
                            placeholder="Color"
                        />
                        {/* <Selection>
                            <SelectionTitle>Is alive</SelectionTitle>
                            <Select>
                                <Option value="true">true</Option>
                                <Option value="false">false</Option>
                            </Select>
                        </Selection> */}
                        
                        <Input 
                            onChange={onAgeValueChange}
                            type="number"
                            min = "0"
                            placeholder="age"
                        />
                        <Input 
                            onChange={onImageValueChange}
                            type="text" 
                            placeholder="Image URL"
                        />
                        <Button 
                            onClick={() => onButtonClick()}
                        >
                            valid
                        </Button>
                    </CreateHero>
                }
            </AddHero>
    )
}

export default NewHero
