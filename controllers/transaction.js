const Transaction = require('../models/transaction')









async function createTransaction (req, res) {

    try {
        let newTransaction = new Transaction(req.body);

        if(!newTransaction.created_at){
            newTransaction.created_at = new Date().getTime();
        }

        const transaction = await newTransaction.save();

        if(!transaction){
            return res.status(400).send({
                ok: false,
                message: 'Error al crear la transacción'
            });
        }

        return res.status(200).send({ 
            ok: true,
            message: 'Transacción creada',
            transaction
        });

    }  

    catch (error) {
        return res.status(500).send({
            ok: false,
            message: 'Error en la petición',
            error
        });
    
    }

}


const getMovements = async (req, res) => {
    const id = req.params.id;
    if (id) {
        try {
            let transactions = await Transaction.find({ client_id: id });
            let user = await User.findById(id).exec();
            if (!transactions || !user) {
                return res.status(404).send({
                    ok: false,
                    msg: 'No se pudo obtener la transaccion ',
                });
            }

            return res.status(200).send({
                ok: true,
                message: 'Transaccion encontrada',
                transactions,
                user
            });

        } catch (error) {
            return res.status(500).send({
                ok: false,
                message: 'Error en la petición',
                error
            });
        }
    } else {
        try {
            let transactions = await Transaction.find({}).sort({ value: -1 });
            if (!transactions) {
                return res.status(404).send({
                    ok: false,
                    message: 'No existen transacciones'
                });
            }

            return res.status(200).send({
                ok: true,
                message: 'Transacciones encontradas',
                transactions
            });
        } catch (error) {
            return res.status(500).send({
                ok: false,
                message: 'Error en la petición',
                error
            });
        }
    }
};





module.exports = {
    createTransaction,
    getMovements
}