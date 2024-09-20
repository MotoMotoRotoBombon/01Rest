class Task {
    constructor(id, title, description, startDate, endDate, status, teamMembers, budget, completed = false, createdAt = new Date()){ 
        this.id = id;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.teamMembers = teamMembers;
        this.budget = budget;
        this.completed = completed;
        this.createdAt = createdAt;
    }
}