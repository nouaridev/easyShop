import styles from "./loaders.module.css";

export default function(){
    return <div className={styles.loaderHolder}>
        <div className={styles.loader}></div>
    </div>
}