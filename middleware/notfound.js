const notFoundMiddleware = (req, res, next) => {
    res.render('pageNotFound');
}

export default notFoundMiddleware