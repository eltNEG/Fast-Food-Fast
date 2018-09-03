import pingRoute from "./ping"

const apiVersion = "/api/v1"


const routes = app => {
    app.use(apiVersion, pingRoute)
}

export default routes