const errorHandler = (err, req, res, next) => {
    //si el error existe incluir al mensaje de error "not found"
    if(err?.message.includes('Not found.')){
        console.log(err.stack);
        return res.status(404).json({ message: err.message });
    }
    //si no, si el error existe incluir al nombre del mensaje "ZodError"
    else if (err?.name.includes('ZodError')) {
        console.log(err.stack);
        return res.status(400).json({ message: err.issues });
    }
    console.log(err.stack);
    return res.status(500).json({ message: err.message });
};

export default errorHandler;