package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	"time"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type ChampionData struct {
	Name  string `json:"name"`
	Title string `json:"title"`
}

type ChampionList struct {
	Data map[string]ChampionData `json:"data"`
}

const championURL = "http://ddragon.leagueoflegends.com/cdn/13.19.1/data/pt_BR/champion.json"

func main() {
	rand.Seed(time.Now().UnixNano())

	// correctGuess := false
	r := gin.Default()
	r.Use(cors.Default())

	r.GET("/getChampion", func(c *gin.Context) {
		championData, err := fetchChampionData()
		if err != nil {
			fmt.Printf("Erro ao buscar dados dos campeões: %v\n", err)
			return
		}
		randomChampion := getRandomChampion(championData)
		c.JSON(200, gin.H{
			"message": randomChampion,
		})
	})

	r.Run()

}

func fetchChampionData() (map[string]ChampionData, error) {
	resp, err := http.Get(championURL)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var championList ChampionList
	if err := json.Unmarshal(body, &championList); err != nil {
		return nil, err
	}

	return championList.Data, nil
}

func getRandomChampion(championData map[string]ChampionData) ChampionData {
	championList := make([]ChampionData, 0, len(championData))
	for _, champion := range championData {
		championList = append(championList, champion)
	}

	randomIndex := rand.Intn(len(championList))
	return championList[randomIndex]
}
