require('dotenv').config();
const mongoose = require('mongoose');
const Tasks = require('../models/Task')

const tasks = [
  {
    name:"Make the bed",
    imageUrl:"https://img1.cgtrader.com/items/114906/e003e38ddd/large/kid-bed-3d-model-max-obj.jpg",
    points:30  
  },
  {
    name:"Brush your teeth",
    imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDlBZzp0wcAcov91wQ2OBdsoYs7Pp7GkDQSRqlIJAdY3215BAxwslytLJNCxXg9sJrf2k&usqp=CAU", 
    points:30  
  },
  {
    name:"Dressing alone",
    imageUrl:"https://preview.free3d.com/img/2015/04/2206015691805427512/13hapf98-900.jpg", 
    points:30  
  },
  {
    name:"Organize room",
    imageUrl:"https://preview.free3d.com/img/2020/03/2399388946489411386/i0yjjxu3-900.jpg", 
    points:30  
  },
  {
    name:"Prepare backpack",
    imageUrl:"https://e7.pngegg.com/pngimages/704/620/png-clipart-backpack-school-backpack-purple-violet-thumbnail.png", 
    points:30  
  }, 
  {
    name:"Clear the table",
    imageUrl:"https://e7.pngegg.com/pngimages/704/620/png-clipart-backpack-school-backpack-purple-violet-thumbnail.png", 
    points:30  
  },
  {
    name:"Setting the table",
    imageUrl:"https://e7.pngegg.com/pngimages/704/620/png-clipart-backpack-school-backpack-purple-violet-thumbnail.png", 
    points:30  
  },
  {
    name:"Dishwashing",
    imageUrl:"https://us.123rf.com/450wm/goodstudio/goodstudio1810/goodstudio181000113/117295993-fregadero-de-la-cocina-lleno-de-platos-sucios-o-menaje-de-cocina-para-lavar-detergentes-esponja-y-gu.jpg?ver=6", 
    points:30  
  },
  {
    name:"Making lunch",
    imageUrl:"https://laopinion.com/wp-content/uploads/sites/3/2020/11/shutterstock_578723461.jpg?quality=80&strip=all&w=1200", 
    points:30  
  },
  {
    name:"Shower",
    imageUrl:"https://previews.123rf.com/images/brgfx/brgfx1706/brgfx170600238/80310003-ni%C3%B1o-ni%C3%B1a-ducha-cuarto-de-ba%C3%B1o-ilustraci%C3%B3n.jpg", 
    points:30  
  },
  {
    name:"Doing homework",
    imageUrl:"https://img.freepik.com/vector-premium/personaje-dibujos-animados-chica-hace-tarea_61103-14.jpg", 
    points:30  
  },
  {
    name:"Folding clothes",
    imageUrl:"https://media.istockphoto.com/vectors/male-blank-folded-shirts-template-vector-id820893416?k=20&m=820893416&s=612x612&w=0&h=AIT6t-Ovcunlhpqj_VD-emMXH8c2l3sBiCiLzyHjPVo=", 
    points:30  
  }, 
  {
    name:"Ironing clothes",
    imageUrl:"https://www.umadecoracion.com/wp-content/uploads/2015/09/plancha-scaled.jpg", 
    points:30  
  },
  {
    name:"Putting up pet food",
    imageUrl:" https://images.ecestaticos.com/lH6K3U3zfaJ2bof8ObJZxlnQhOI=/0x0:865x662/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F960%2F39b%2Ff08%2F96039bf08a508753a895ebaae8674745.jpg", 
    points:30  
  },
  {
    name:"Washing pet",
    imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmGa0IXSC_LrVV-NHZLf6t4x5adMRFmnll4j9tqx06YJ64YYGMJMbznqxhBop4Q6iamOA&usqp=CAU", 
    points:30  
  },

   {
    name:"Pet grooming",
    imageUrl:" https://ae01.alicdn.com/kf/Hd8adbd24e7aa4a82b8a40d68f0f3652da/Herramienta-de-aseo-para-mascotas-cepillo-de-pelo-corto-para-perros-peine-de-masaje-para-gatos.jpg_Q90.jpg_.webp", 
    points:30  
  },
  {
    name:"Bringing out the pet",
    imageUrl:"https://thumbs.dreamstime.com/b/perro-que-camina-de-la-muchacha-solamente-82634119.jpg",   
    points:30  
  },
]
mongoose.connect(process.env.MONGO_URL)
  .then(x => console.log(`Connected to ${x.connection.name}`))
  .then(() => {
    return  Tasks.create(tasks)
  })
  .then(() => {
    console.log('Seed done 🌱');
  })
  .catch(e => console.log(e))
  .finally(() => {
    console.log('Closing connection');
    mongoose.connection.close();
  })
