import { INews } from '@/interfaces/store.interfaces';
import { Button, Card } from 'antd';
import { FC } from 'react';
import styles from './newsCard.module.scss';
import Image from 'next/image';

type NewsCardProps = Pick<INews, 'title' | 'link' | 'description' | 'content'>;

const NewsCard: FC<NewsCardProps> = ({ title, link, description, content }) => {
	return (
		<Card title={title} bordered={true}>
			<div className={styles.description}>
				<p>
					{description
						? description.slice(0, 350)
						: content
						? content.slice(0, 350)
						: 'Ошибка отображения новости'}
					...
				</p>
				<div className={styles.info_grid}>
					<Button href={link} type='link'>
						Читать в источнике
					</Button>
				</div>
			</div>
		</Card>
	);
};

export default NewsCard;
