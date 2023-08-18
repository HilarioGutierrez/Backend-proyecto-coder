const errorHandler = (err, req, res, next) => {
    if (err?.message.includes('not found')) {
        req.logger.error(err.stack);
        return res.status(404).json({ message: err.message });
    } else if (err?.name.includes('ZodError')) {
        req.logger.error(err.stack);
        return res.status(400).json({ message: err.issues });
    } else if (err?.message.includes('User not found')) {
        req.logger.error(err.stack);
        return res.status(400).json({ message: err.message });
    } else if (err?.message.includes('Invalid credentials')) {
        req.logger.error(err.stack);
        return res.status(500).json({ message: err.message });
    }

    req.logger.error(err.stack);

    return res.status(500).json({ message: err.message });
};

export default errorHandler;

