import { INews } from '@/interfaces/store.interfaces';
import { Button, Card } from 'antd';
import { FC } from 'react';

type NewsCardProps = Pick<INews, 'title' | 'link' | 'description' | 'content'>;

const NewsCard: FC<NewsCardProps> = ({ title, link, description, content }) => {
	return (
		<Card title={title} bordered={true} style={{ whiteSpace: 'normal' }}>
			<div>
				<p>
					{description
						? description.slice(0, 350)
						: content
						? content.slice(0, 350)
						: 'Ошибка отображения новости'}
					...
				</p>
				<div>
					<Button href={link} type='link'>
						Читать в источнике
					</Button>
				</div>
			</div>
		</Card>
	);
};

export default NewsCard;
