import Message from "../models/message.js";

const controller = { 
    //Funcion para guardar los mensajes
    save: async (req, res) => { 
        const params = req.body;
        const message = new Message();
        message.message = params.message;
        message.from = params.from;

        message.save()
        .then((messageStored)=> {
          
            return res.status(200).send({
                status: 'Success', 
                messageStored 
            })
        }).catch((error) =>{
            return res.status(404).send({
                status: 'error',
                message: 'No ha sido posible guardar el mensaje',
                error
            })
         })
    },

    //Función para obtener todos los mensajes 
    getMessages: async (req, res) => { 
        const query = Message.find({});
        query.sort('-_id').exec()
        .then((messages) => { 
            if (!Message) { 
                return res.status(404).send({
                    status: 'Error',
                    message: 'No hay mensajes que mostrar'
                })
            }
            return res.status(200).send({
                status: 'Success',
                messages
            })
        }). catch((error)=> {
            return res.status(500).send({
                status: 'Error',
                message: 'Error al extraer los datos',
                error
            })
        })
    }
}

export default controller;