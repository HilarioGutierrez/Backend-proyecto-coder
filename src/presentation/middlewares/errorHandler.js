const errorHandler = (err, req, res, next) => {
    //si el error existe incluir al mensaje de error "not found"
    if(err?.message.includes('not found')){
        req.logger.error(err.stack);
        return res.status(404).json({ message: err.message });
    }
    //si no, si el error existe incluir al nombre del mensaje "ZodError"
    else if (err?.name.includes('ZodError')) {
        req.logger.error(err.stack);
        return res.status(400).json({ message: err.issues });
    }
    else if (err?.message.includes('User not found')) {
        req.logger.error(err.stack);
        return res.status(400).json({ message: 'User not found' });
    }
    else if (err?.message.includes('Invalid credentials')) {
        req.logger.error(err.stack);
        return res.status(500).json({ message: 'Invalid credentials' });
    }
    req.logger.error(err.stack);
    return res.status(500).json({ message: err.message });
};

export default errorHandler;