// eslint-disable-next-line object-curly-spacing
import { initializeApp } from "firebase-admin/app";
// eslint-disable-next-line object-curly-spacing
import { getFirestore } from "firebase-admin/firestore";
// eslint-disable-next-line object-curly-spacing
import { onRequest } from "firebase-functions/v2/https";

// Inicializa o Firebase Admin SDK
initializeApp();

// Função HTTP que retorna usuários em ordem alfabética
export const getUsers = onRequest(async (req, res) => {
  try {
    const db = getFirestore();

    const snapshot = await db
      .collection("users")
      .orderBy("name") // ou o campo que você quiser ordenar
      .get();

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({error: "Erro ao buscar usuários"});
  }
});


export const updateUser = onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  try {
    const db = getFirestore();
    const {id, codeColaborator, isColaborator} = req.body;

    if (!id || codeColaborator === undefined || isColaborator === undefined) {
      res.status(400).json(
        {error: "Campos obrigatórios: id, codeColaborator e isColaborator"}
      );
      return;
    }

    const userRef = db.collection("users").doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
      res.status(404).json({error: "Usuário não encontrado"});
      return;
    }

    await userRef.update({
      codeColaborator,
      isColaborator,
    });

    res.status(200).json({message: "Usuário atualizado com sucesso"});
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({error: "Erro ao atualizar usuário"});
  }
});
