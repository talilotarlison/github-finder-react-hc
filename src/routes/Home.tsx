import Header from "../components/Header"
import { useState } from 'react'

import UserPros from "../types/user"
import styles from "./Home.module.css"

import User from "../components/User"
import ErroUser from "../components/ErrorUser"

function Home() {
    const [userName, setUserName] = useState<string>("")
    const [userData, setUserData] = useState<UserPros | null>(null)

    const [error, serError] = useState<boolean>(false)

    function hadlerInputText(name: string): void {
        setUserName(name)
    }

    function handlerkeyDown(e: any): void {
        if (e.key == "Enter") {
            buscaUser(userName)
        }
    }

    let buscaUser = async (nomeUser: string) => {
        setUserData(null)
        serError(false)
        
        let busca = await fetch(`http://api.github.com/users/${nomeUser}`)
        let resultado = await busca.json()

        if (resultado.status == "404") {
            serError(true)
        }

        const userDataApi: UserPros = {
            avatar_url: resultado.avatar_url,
            login: resultado.login,
            location: resultado.location,
            followers: resultado.followers,
            following: resultado.following
        }
        setUserData(userDataApi)
        console.log(userData)
    }
    return (
        <>
            <div>
                <Header />
                <div className={styles.busca}>
                    <h2>Busque por um usuario:</h2>
                    <p>Conheça seus melhores repositorios.</p>
                    <div className={styles.inputBusca} >
                        <input type="text"
                            placeholder="Digite o nome do usuario" value={userName}
                            onChange={(e) => hadlerInputText(e.target.value)}
                            onKeyDown={(e) => { handlerkeyDown(e) }} />
                        <button className={styles.btn} onClick={() => buscaUser(userName)} >
                            <span className="material-symbols-outlined">
                                search
                            </span>
                        </button>

                    </div>
                    <div>
                        {error == true ? (
                            <ErroUser />
                        ) : (
                           
                            <User user={userData} />
                           
                        )}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Home
