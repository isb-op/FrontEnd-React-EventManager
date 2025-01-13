import style from './DefaultButton.module.css'

export function DefaultButton({handleClick,texto}){

    return(
        <>
            <button className={style.button} onClick={handleClick}>
                {texto}
            </button>
        </>
    )
}