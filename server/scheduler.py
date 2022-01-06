from apscheduler.schedulers.background import BlockingScheduler

from api_requests.corona_api_request import addLatestSeoulCoronaPatients


def main():
    sched = BlockingScheduler(timezone="Asia/Seoul")
    sched.add_job(addLatestSeoulCoronaPatients, "cron", hour="20", minute="00", second="00")
    sched.start()


if __name__ == "__main__":
    main()
