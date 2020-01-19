const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
//console.log(__dirname)
//console.log(__filename)

//Configure express server
const app = express()

//Path to folder 
const publicDirPath = path.join(__dirname, '../public')  //used to join paths
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath =  path.join(__dirname, '../templates/partials')

//set up templating engine in this case, handlebars. All templates must live in a folder called views @root of program
app.set('view engine', 'hbs') //"view engine" is case sensitive
app.set('views', viewsPath) //Customize where templates are being served from
hbs.registerPartials(partialsPath) //configure where partials are. partials are common code

//Customize server, serve files from this location. Not needed if serving templates
app.use(express.static(publicDirPath)) //serving directory

//Serving templates 1
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name:'Sly'
    }) //renders a view , second arg is an object of values to render
})
//Serving templates 2
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        msg: 'We templating bro'
    }) //renders a view , second arg is an object of values to render
})


//Serve a route
app.get('/weather', (req, res) => {
    //query strings from request
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'Unable to get weather for location'
        })
    }
                                                           //default value
    geocode(address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({
                error: 'Unable to get address information'
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: 'Unable to get forecast information for '+address
                })
            }

            return res.send({
                forecast: forecastData,
                location: address
            })
        })
    })

    

}) 

//serve custom 404
app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404 hold up now'
    }) // this is the return for this call. Could be html 
}) 


//Serve a 404. This has to be last
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page not found'
    }) // this is the return for this call. Could be html 
}) 


app.listen(3000, () => console.log('Server running at port 3000')) //starts the server at port 3000. Optional callback

//handle request to a specific url (serve a route)
//@params for get(): route(url user requested. Empy is for Home/Root), function(request, response)
//Will not run if serving files with express.static for the same route
// app.get('', (req, res) => {
//     res.send(`
//               <h1> Welcome </h1>
//             `) // this is the return for this call. Could be html, this msg shows in browser 
// }) 


//Serve a route
// app.get('/about', (req, res) => {
//     res.send('<h1> About </h1>') // this is the return for this call. Could be html 
// }) 

