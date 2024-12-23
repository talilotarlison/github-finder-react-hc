import styles from "./User.module.css"
import LocationIcon from "../assets/ping_drop.svg"
// 
function User(props: any) {

    return (

        <div className={(props.user?.login != null) ? styles.user : styles.userNone}>
            <img src={props.user?.avatar_url} />
            <p className={styles.nome}>{props.user?.login}</p>
            <div className={styles.localizacaoUser}>
                <img src={LocationIcon} alt='Icon Localização' />
                <p>{props.user?.location ?? "Sem Localização"}</p>
            </div>
            <div className={styles.follow}>
                <div>
                    <p>Seguidores:</p>
                    <p  className={styles.followNumber}>{props.user?.followers}</p>
                </div>
                <div >
                    <p>Seguindo:</p>
                    <p className={styles.followNumber}>{props.user?.following}</p>
                </div>       
            </div>
            <a href="#">Ver melhores Repsitorios</a>
        </div>

    )
}

export default User