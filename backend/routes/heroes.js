const express = require("express")
const app = express()
let heroes = require("../heroes.json")
const morgan =  require("morgan")

app.use(morgan('tiny'))
app.use(express.json())

// check if the hero doesn't exist 
const checkHeroFalse = (req,res, next) => {
    const hero = heroes.find(hero => hero.slug === req.body.slug ) 

    if(hero) {
        res.status(409).send("exist already")
    }else {
        next()
    }
}
// check if the hero exist
const checkHeroTrue = (req, res ,next) => {
    const {slug} = req.params
    const hero = heroes.find(hero => hero.slug === slug)
    if(hero){
        next()
    }else {
        res.status(404).send("Not found")
    }
}

// const validateHero = (req,  res, next) => {

// }
// show all heroes
app.get('/', (req, res) => {
    res.json(heroes)
    console.log(heroes.slug);
})

// show one hero that have the same slug as the url slug
app.get('/:slug', checkHeroTrue, (req, res) => {
    const {slug} = req.params
    const heroe = heroes.find((heroe) => heroe.slug === slug)
    res.json(heroe)
})

// Show the power of one hero that have the same slug as the url slug
app.get('/:slug/powers', checkHeroTrue, (req, res) => {
    const {slug} = req.params
    const heroe = heroes.find(heroe => heroe.slug === slug)
    res.json(heroe.power.join(', '))  
})

// add one hero to the list of heroes
app.post('/', checkHeroFalse, (req, res) => {
    const heroe = {...req.body}
    heroes = [
        ...heroes, heroe
    ]
    res.json(heroe)
    console.log(heroe);
})

// add a new power to a hero that have the same slug as the url
app.put('/:slug/powers', (req, res) => {
    const {slug} = req.params
    const heroe = heroes.find(heroe => heroe.slug === slug)
    const power = req.body.power
    heroe.power = [...heroe.power, power]

    res.json(heroe.power.join(', '))

})

// delete a hero that have the same slug as the url
app.delete('/:slug', checkHeroTrue, (req, res) => {
    const {slug} = req.params
    const hero = heroes.findIndex(hero => hero.slug === slug)
    heroes.splice(hero,1)
    res.status(200).send(`hero deleted`)
})

// delete a hero power 
app.delete("/:slug/power/:power", checkHeroTrue, (req, res) => {
    const {slug, power} = req.params
    const hero =  heroes.find(hero => hero.slug === slug)
    const powerIndex = hero.power.findIndex(element => element === power)
    hero.power.splice(powerIndex, 1)
    res.status(200).send(`power ${power} deleted`)
})

app.put("/:slug/", (req, res) => {
    const {slug} = req.params
    const hero = heroes.findIndex(hero => hero.slug === slug)
    const newHero = req.body
    heroes.splice(hero, 1, newHero)
    res.json(newHero)
})
module.exports = app


