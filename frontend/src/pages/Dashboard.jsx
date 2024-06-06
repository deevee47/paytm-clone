import axios from "axios"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useEffect, useState } from "react"

export const Dashboard = () => {
    const [value, setValue] = useState(0)
    const getValue = async () => {

        const response = await axios.get("http://localhost:5000/api/v1/account/balance", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        setValue(response.data.balance)
    }
    useEffect(() => {
        getValue();
    }, []);
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={value} />
            <Users />
        </div>
    </div>
}