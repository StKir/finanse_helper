import { INews } from '@/interfaces/store.interfaces';
import { Card } from 'antd';
import { FC } from 'react';
import styles from './newsCard.module.scss';
import Image from 'next/image';

type NewsCardProps = Pick<
	INews,
	'title' | 'link' | 'description' | 'content' | 'source_id' | 'image_url'
>;

const NewsCard: FC<NewsCardProps> = ({
	title,
	link,
	description,
	content,
	source_id,
	image_url
}) => {
	return (
		<Card title={title} bordered={true}>
			<div className={styles.description}>
				{image_url && (
					<Image
						alt='Picture of the author'
						src={image_url}
						width={100}
						height={100}
					/>
				)}
				{description.slice(0, 100)}
			</div>
		</Card>
	);
};

export default NewsCard;
