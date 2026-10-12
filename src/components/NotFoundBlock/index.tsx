import { Link } from 'react-router-dom';
import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <div className={styles.emoji}>🍕</div>
      <h2 className={styles.title}>Ничего не найдено</h2>
      <p className={styles.description}>
        К сожалению, такой страницы нет. Возможно, пицца уже съедена, а ссылка устарела.
      </p>
      <Link to="/" className={styles.button}>
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFoundBlock;
