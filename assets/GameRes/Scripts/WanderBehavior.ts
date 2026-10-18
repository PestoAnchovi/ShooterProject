import { _decorator, Component, math, Node, Vec2 } from 'cc';
import { ISteeringBehavior } from './ISteeringBehavior';
import { SeekBehavior } from './SeekBehavior';
const { ccclass, property } = _decorator;

@ccclass('WanderBehavior')
export class WanderBehavior implements ISteeringBehavior {
    
    private waysPoints: Vec2[] = []
    private currentWayPointIndex: number = 0
    private wayPointThreshold: number = 10

    private seekBehavior: SeekBehavior = new SeekBehavior()

    public setWayPoints(points: Vec2[]) {
        this.waysPoints = points
        this.pickNewWanderPoint()
    }

    public pickNewWanderPoint() {
        if (this.waysPoints.length <= 0) return 0
        this.currentWayPointIndex = math.randomRangeInt(0, this.waysPoints.length)
    }

    public hasArrived(currentPos: Vec2) : boolean{
        if (this.waysPoints.length <= 0) return

        let currentTarget = this.waysPoints[this.currentWayPointIndex]
        return Vec2.distance(currentPos, currentTarget) <= this.wayPointThreshold

    }

    getDesiredVelocity(currentPosition: Vec2): Vec2 {
        if (this.waysPoints.length === 0) return Vec2.ZERO

        let currentTarget = this.waysPoints[this.currentWayPointIndex]
        return this.seekBehavior.getDesiredVelocity(currentPosition, currentTarget)
    }

    //private compositeIntent: IntentSteeringBehavior = new IntentSteeringBehavior()

    /*public init(points: Vec2[], intent: IntentConfig) {
        this.setWayPoints(points)
        this.setWeights(intent)
    }
    
    private setWeights(intent: IntentConfig) {
        this.compositeIntent.setWeights(intent)
    }


    

    

    
}*/
}


