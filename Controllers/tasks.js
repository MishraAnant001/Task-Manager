import task from '../Models/task.js'

const getAllTasks =async(req,res)=>{
    // res.send('All tasks')
    try {
        const response  = await task.find({})
        res.status(200).json({response})
    } catch (error) {
        res.status(500).json({
            message:error
        })
    }
}

const postTask = async(req,res)=>{
    // res.send('Post task')
    try {
        const response  = await task.create(req.body)
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json({
            message:error
        })
    }

    // console.log(req.body)

}

const getTaskById = async(req,res)=>{
    // console.log(req.params)
    // res.send('Get task by id')
    try {
        const {id:taskID} = req.params;
        const response  = await task.findOne({_id:taskID});
        if(!response){
            return res.status(404).json({
                msg:`no task with id ${taskID} found`
            })
        }
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json({
            message:error
        })
    }

}

const patchTaskById  = async(req,res)=>{
    // console.log(req.params)
    // res.send('Patch task by id')
    try {
        const {id:taskID} = req.params;
        const response  = await task.findByIdAndUpdate(taskID,req.body);
        if(!response){
            return res.status(404).json({
                msg:`no task with id ${taskID} found`
            })
        }
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json({
            message:error
        })
    }

}

const deleteTaskById = async(req,res)=>{
    // console.log(req.params)
    // res.send('Delete task by id')
    try {
        const {id:taskID} = req.params;
        const response  = await task.findOneAndDelete({_id:taskID});
        if(!response){
            return res.status(404).json({
                msg:`no task with id ${taskID} found`
            })
        }
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json({
            message:error
        })
    }
}
export {getAllTasks,postTask,getTaskById,patchTaskById,deleteTaskById}