const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


const loginFactory = (FactoryModel) => {
  return async function (req, res) {
    try {
      const { email, password } = req.body;

      const findUser = await FactoryModel.findOne({ email });
      if (!findUser) {
        return res.status(401).json({ 
          status: "failure",
           message: "User is not registered" });
      }

      const isMatchedPassword = await bcrypt.compare(password, findUser.password);
      if (!isMatchedPassword) {
        return res.status(401).json({
           status: "failure", 
           message: "Invalid password" });
      }

     
      const token = jwt.sign(
        { id: findUser._id, email: findUser.email }, 
        process.env.SECRET_KEY, 
        { expiresIn: "15h" } 
      );
     

      res.status(200).json({
        status: "success",
        message: "Login successfully",
        token: token 
      });

    } catch (e) {
      res.status(500).json({ 
        status: "failure",
         message: e.message });
    }
  };
};


const factoryRegister = (FactoryModel) => {
  return async function (req, res) {
    try {
      const { name, email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
        return res.status(400).json({
          status: "failure",
          message: "Passwords do not match",
        });
      }
     
      const existingUser = await FactoryModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          status: "failure",
          message: "User already exists"
        });
      }

   
      const hashedPassword = await bcrypt.hash(password, 10);

    
      const newUser = await FactoryModel.create({
        name,
        email,
        password: hashedPassword
      });

     
      const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        process.env.SECRET_KEY,
        { expiresIn: "15h" }
      );

     
      const userResponse = newUser.toObject();
      delete userResponse.password;

      res.status(201).json({
        status: "success",
        message: "User registered successfully",
        token: token, 
        data: userResponse
      });

    } catch (e) {
      res.status(500).json({
        status: "failure",
        message: e.message
      });
    }
  };
};

const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
         message: "You are not logged in" });
    }


    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded; 
    next();
  } catch (e) {
    res.status(401).json({
         message: "Invalid or expired token" });
  }
};



const factoryCreate = (FactoryModel) => {
  return async function(req, res){
    try{
      const factory = await FactoryModel.create(req.body)
      res.status(200).json({
        status: "success",
        message: "Event Create successfully",
        data: factory
      })
    }catch(e){
      res.status(500).json({
        status: "failure",
        message: e.message
      })
    }
  }
}

const getAllFactory = (FactoryModel) => {
  return async function (req, res) {
    try {
      const users = await FactoryModel.find()

      res.status(200).json({
        status: "success",
        message: "Fetched all users successfully",
        data: users
      })

    } catch (e) {
      res.status(500).json({
        status: "failure",
        message: e.message
      })
    }
  }
}


const getFactoryId = (FactoryModel) => {
  return async function (req, res) {
    try {
      const userId = req.params.id
      const user = await FactoryModel.findById(userId)

      if (!user) {
        return res.status(404).json({
          status: "failure",
          message: "User not found"
        })
      }

      res.status(200).json({
        status: "success",
        message: "User fetched successfully",
        data: user
      })

    } catch (e) {
      res.status(500).json({
        status: "failure",
        message: e.message
      })
    }
  }
}


const deleteFactoryId = (FactoryModel) => {
  return async function (req, res) {
    try {
      const factoryId = req.params.id
      const deletedUser = await FactoryModel.findByIdAndDelete(factoryId)

      if (!deletedUser) {
        return res.status(404).json({
          status: "failure",
          message: "User not found"
        })
      }

      res.status(200).json({
        status: "success",
        message: "Deleted successfully",
        data: deletedUser
      })

    } catch (e) {
      res.status(500).json({
        status: "failure",
        message: e.message
      })
    }
  }
}




module.exports = {
  factoryRegister,
  loginFactory,
  protect,
  factoryCreate,
  getAllFactory,
  getFactoryId,
  deleteFactoryId
}
