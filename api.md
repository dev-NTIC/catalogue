#Login:

    link: /api/signin
    type: POST
    data: {
        "user": "xxx",
        "password": "xxx"
    }

    return : 
        if correct info: 
            status: 201,
            data: 
            {
                "token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",

                "user": [
                    {
                        "id": 1,
                        "nom": "BOUROUBA",
                        "prenom": "ILYES",
                        "phone": "0550124578",
                        "email": "ilyes@gmail.com",
                        "password": "0000",
                        "usertype_id": 1
                    }
                ]
            }
        
        if incorrect info :  
            status: 401
            data: {
                "message": "Invalid credentials"
            }

#register:

    link: /api/signup
    type: POST
    data: {
            "nom": "xxx", 
            "prenom": "xxx", 
            "phone": "xxx", 
            "email": "xxx", 
            "password": "xxx"
        }

    return : 
        if missing parameters :
            status: 400 
            data: {
                "message": "missing parameters"
            }
        
        if user exists :
            status: 400
            data: {
                "message": "user already exists !"
            }

        user created : 
        status: 201
        data: {
            "message": "user created !"
        }


# to use any API you should send the token in header section.

if the token is NOT set : 

    status: 401
    data:{ message: "Unauthorized" }


if the Token is invalid:

    status: 401
    data:{ message: "Invalid token" }
