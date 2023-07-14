

const express=require('express')

const cors=require('cors')


const app=express();

const PORT=3000
app.use(express());
app.use(cors())

const Post=[

    {
        name:'Asim',
        role:'software developer'
    },
    {
        name:'joe',
        role:'react-js'
    }
]


app.get('/',(req,res)=>{
    res.json("successfully created")
})

app.post('/posts',(req,res)=>{
  res.send({ data: Post, message: "Freshers data" });
  res.json("successfully created")
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });