from apscheduler.schedulers.background import BlockingScheduler

from api_requests.corona_api_request import addLatestSeoulCoronaPatients
from api_requests.getSeoulPopDailyAsCSV import saveSeoulPopDailyAsCSV
from api_requests.getVaccinatedAsCSV import saveVaccinated


def main():
    sched = BlockingScheduler(timezone="Asia/Seoul")
    # sched.add_job(addLatestSeoulCoronaPatients, "cron", hour="13", minute="56", second="10")
    # # sched.add_job(saveSeoulPopDailyAsCSV, "cron", hour="11", minute="11", second="20")
    # # sched.add_job(saveVaccinated, "cron", hour="11", minute="11", second="50")
    sched.add_job(addLatestSeoulCoronaPatients, "cron", hour="20", minute="00", second="00")
    sched.add_job(saveSeoulPopDailyAsCSV, "cron", hour="20", minute="00", second="20")
    sched.add_job(saveVaccinated, "cron", hour="20", minute="00", second="50")
    sched.start()


if __name__ == "__main__":
    main()
