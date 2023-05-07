# reset password:

    1# cheking the mail :

        link: /api/checkmail
        type: POST
        data: {
                "mail": "xxx",
            }

        return :
            if missing parameters :
                status: 400
                data: {
                    "message": "missing parameters"
                }
            
            if Internal Server Error
                status: 500
                    data: {
                        "message": "Internal Server Error"
                    }

            if user doesn't exists :
                status: 400
                data: {
                    "message": "user doesn't exists"
                }
            
            if Email send failed
                status: 500
                    data: {
                        "message": "Email send failed"
                    }

            if mail sent
                status: 201
                    data: {
                        message: "mail sent.", 
                        mail: xxx
                    }

    2# checkcode :

    link: /api/checkcode
        type: POST
        data: {
                "mail": "xxx",
                "code": "xxxxx" // 5 digit
            }
        
        return :
            if missing parameters :
                status: 400
                data: {
                    "message": "missing parameters"
                }
            
            if Internal Server Error
                status: 500
                    data: {
                        "message": "Internal Server Error"
                    }
            
            if code wrong :
                status: 400
                data: {
                    "message": "wrong code"
                }
            
            if correct code :
                status: 201
                data: {
                    message: "correct code",
                    id: xxxx,
                }


    #3 update password :

    link: /api/updatepassword
        type: POST
        data: {
                id: xxx, 
                password : xxxx
            }
        
        return :
            if missing parameters :
                status: 400
                data: {
                    "message": "missing parameters"
                }
            
            if Internal Server Error
                status: 500
                    data: {
                        "message": "Internal Server Error"
                    }

            if password updated
                status: 201
                data: {
                    "message": "password updated"
                }


# update user informations:

link: /api/updateuser
        type: POST
        data: {
                nom : xxx, 
                prenom : xxx, 
                phone : xxx, 
                email : xxx, 
                password : xxx, 
                usertype_id : xxx, 
                id : xxx
            }

        return :
            if missing parameters :
                status: 400
                data: {
                    "message": "missing parameters"
                }
            
            if Internal Server Error
                status: 500
                    data: {
                        "message": "Internal Server Error"
                    }
            
            if information updated
                status: 201
                data: {
                    "message": "information updated"
                }





