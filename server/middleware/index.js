const checkimage = ( req, res, next) => {
    console.log('check image middleware')
    next();
}

module.exports = checkimage;