import styles from './styles.json';

import { View, Image } from 'react-native';

export default function Comentario({comentario, replies}) {
    return (
        <View style={styles.comment} >

            <View style={styles.comment_image_container}>
                <Image source={require('./eu.jpg')}/>
            </View>

            <View style={styles.comment_right_part}>

                <View style={styles.comment_content}>
                    <View style={styles.comment_author}>{comentario.nome}</View>
                    <View>{comentario.data_post}</View>
                </View>

                <View style={styles.comment_text}>{comentario.body}</View>

                {/*
                    Aqui verifica se o array replies do comentário é maior que zero, ou seja, possui alguma reply
                    Se tiver, renderiza uma view com um componente Comment, ou seja, utiliza-se da recursividade para
                    renderizar novos comentários-filhos, só que dessa vez, diferentemente do que se faz no componente Comments,
                    o parâmetro replies recebe um array vazio, ou seja, não há nenhuma "reply da reply", não renderizando nada por causa
                    da primeira condição.
                    A key é o id da reply, o comentário é o próprio objeto reply que entra nesse componente e renderiza o comentário de acordo,
                    e o replies recebe um array vazio para não renderizar replies nem ficar espaçoes em branco.

                */}
                { replies.length > 0 && (

                    <View style={styles.replies}>
                        {replies.map( (reply) => (
                            <Comment key={reply.id} comment={reply} replies={[]} />
                        ))}
                    </View>
                )}

            </View>
        </View>
    );
}
